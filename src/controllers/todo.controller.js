const API = "http://localhost:3000/todo_list"

function getSession() {
    return JSON.parse(localStorage.getItem("user"))
}

function getQueryParams() {
    const hash = window.location.hash
    const queryString = hash.includes("?") ? hash.split("?")[1] : ""
    return Object.fromEntries(new URLSearchParams(queryString))
}

function setQueryParams(params) {
    const base = window.location.hash.split("?")[0]
    const query = new URLSearchParams(params).toString()
    const newHash = query ? `${base}?${query}` : base
    history.pushState(null, "", newHash)
}

async function fetchTasks(params = {}) {
    const query = new URLSearchParams(params).toString()
    const response = await fetch(`${API}?${query}`)
    return response.json()
}

async function createTask(taskData) {
    const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
    })
    return response.json()
}

async function updateTask(id, taskData) {
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
    })
    return response.json()
}

async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" })
}

const badgeClass = {
    initial:   "bg-zinc-800 text-zinc-300",
    process:   "bg-yellow-950 text-yellow-400",
    completed: "bg-green-950 text-green-400"
}

function renderTasks(tasks) {
    const container = document.getElementById("tasks_container")

    if (tasks.length === 0) {
        container.innerHTML = `<p class="text-zinc-500 text-center mt-10">No tasks yet.</p>`
        return
    }

    container.innerHTML = tasks.map(task => `
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2" data-id="${task.id}">
            <div id="view_${task.id}">
                <div class="flex justify-between items-center">
                    <h3 class="text-white font-medium">${task.title}</h3>
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass[task.status]}">${task.status}</span>
                </div>
                <p class="text-zinc-400 text-sm mt-1">${task.description}</p>
                <div class="flex gap-2 mt-3">
                    <select class="select-status bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-2 py-1 outline-none" data-id="${task.id}">
                        <option value="initial"   ${task.status === "initial"   ? "selected" : ""}>Initial</option>
                        <option value="process"   ${task.status === "process"   ? "selected" : ""}>Process</option>
                        <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completed</option>
                    </select>
                    <button class="btn-edit text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg transition-colors" data-id="${task.id}">
                        Edit
                    </button>
                    <button class="btn-delete text-xs bg-red-950 hover:bg-red-900 text-red-400 px-3 py-1 rounded-lg transition-colors" data-id="${task.id}">
                        Delete
                    </button>
                </div>
            </div>
            <div id="edit_${task.id}" style="display:none" class="flex flex-col gap-2">
                <input type="text" class="edit-title bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-red-500 transition-colors" value="${task.title}" data-id="${task.id}"/>
                <textarea class="edit-description bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm resize-none h-20 outline-none focus:border-red-500 transition-colors" data-id="${task.id}">${task.description}</textarea>
                <div class="flex gap-2">
                    <button class="btn-save text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors" data-id="${task.id}">
                        Save
                    </button>
                    <button class="btn-cancel text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg transition-colors" data-id="${task.id}">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `).join("")
}

function attachEvents(user) {
    const form = document.getElementById("taskForm")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const title       = document.getElementById("task_title").value.trim()
        const description = document.getElementById("task_description").value.trim()
        if (!title) return alert("El título es obligatorio")
        await createTask({ id_user: user.id, title, description, status: "initial" })
        form.reset()
        await loadTasks(user)
    })

    document.getElementById("tasks_container").addEventListener("change", async (e) => {
        if (!e.target.classList.contains("select-status")) return
        const id     = e.target.dataset.id
        const status = e.target.value
        const tasks  = await fetchTasks(user.role === "admin" ? {} : { id_user: user.id })
        const task   = tasks.find(t => t.id === id)
        await updateTask(id, { ...task, status })
        await loadTasks(user)
    })

    document.getElementById("tasks_container").addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-delete")) {
            const id = e.target.dataset.id
            if (!confirm("¿Eliminar esta tarea?")) return
            await deleteTask(id)
            await loadTasks(user)
        }

        if (e.target.classList.contains("btn-edit")) {
            const id = e.target.dataset.id
            document.getElementById(`view_${id}`).style.display = "none"
            document.getElementById(`edit_${id}`).style.display = "flex"
        }

        if (e.target.classList.contains("btn-cancel")) {
            const id = e.target.dataset.id
            document.getElementById(`view_${id}`).style.display = "block"
            document.getElementById(`edit_${id}`).style.display = "none"
        }

        if (e.target.classList.contains("btn-save")) {
            const id          = e.target.dataset.id
            const title       = document.querySelector(`.edit-title[data-id="${id}"]`).value.trim()
            const description = document.querySelector(`.edit-description[data-id="${id}"]`).value.trim()
            if (!title) return alert("El título es obligatorio")
            const tasks = await fetchTasks(user.role === "admin" ? {} : { id_user: user.id })
            const task  = tasks.find(t => t.id === id)
            await updateTask(id, { ...task, title, description })
            await loadTasks(user)
        }
    })

    document.getElementById("filter_status")?.addEventListener("change", () => applyFilters(user))
    document.getElementById("filter_search")?.addEventListener("input",  () => applyFilters(user))
    document.getElementById("filter_user")?.addEventListener("change",   () => applyFilters(user))
}

async function applyFilters(user) {
    const status = document.getElementById("filter_status").value
    const search = document.getElementById("filter_search").value.toLowerCase()
    const userId = document.getElementById("filter_user")?.value

    const params = {}
    if (status) params.status = status
    if (search) params.search = search
    if (userId) params.user   = userId
    setQueryParams(params)

    const fetchParams = {}
    if (user.role !== "admin") fetchParams.id_user = user.id
    if (status) fetchParams.status  = status
    if (userId) fetchParams.id_user = userId

    const tasks = await fetchTasks(fetchParams)
    const filtered = search
        ? tasks.filter(t =>
            t.title.toLowerCase().includes(search) ||
            t.description.toLowerCase().includes(search)
          )
        : tasks

    renderTasks(filtered)
}

async function loadTasks(user) {
    const params = getQueryParams()

    const fetchParams = {}
    if (user.role !== "admin") fetchParams.id_user = user.id
    if (params.status) fetchParams.status  = params.status
    if (params.user)   fetchParams.id_user = params.user

    const tasks = await fetchTasks(fetchParams)
    const filtered = params.search
        ? tasks.filter(t =>
            t.title.toLowerCase().includes(params.search) ||
            t.description.toLowerCase().includes(params.search)
          )
        : tasks

    const filterStatus = document.getElementById("filter_status")
    const filterSearch = document.getElementById("filter_search")
    const filterUser   = document.getElementById("filter_user")

    if (filterStatus && params.status) filterStatus.value = params.status
    if (filterSearch && params.search) filterSearch.value = params.search
    if (filterUser   && params.user)   filterUser.value   = params.user

    renderTasks(filtered)
}

async function loadUsers() {
    const select = document.getElementById("filter_user")
    if (!select) return

    const response = await fetch("http://localhost:3000/users")
    const users = await response.json()

    users
        .filter(u => u.role !== "admin")
        .forEach(u => {
            const option = document.createElement("option")
            option.value = u.id
            option.textContent = u.full_name
            select.appendChild(option)
        })
}

export async function todoController() {
    const user = getSession()
    await loadUsers()
    await loadTasks(user)
    attachEvents(user)
}