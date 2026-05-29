export default function userView() {
    const user = JSON.parse(localStorage.getItem("user"))
    const isAdmin = user?.role === "admin"

    return `
    <div class="flex flex-col gap-6 max-w-4xl mx-auto">
        <div class="flex justify-between items-center">
            <div class="flex flex-col gap-1">
                <h1 class="text-white text-2xl font-semibold">${isAdmin ? "All tasks" : "My tasks"}</h1>
                <p class="text-zinc-500 text-sm">${isAdmin ? "Manage all users tasks" : "Manage your personal tasks"}</p>
            </div>
        </div>

        <div class="flex gap-3 flex-wrap">
            <input
                type="text"
                id="filter_search"
                placeholder="Search tasks..."
                class="bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm flex-1 min-w-40 focus:border-red-500 outline-none transition-colors"
            />
            <select id="filter_status" class="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none transition-colors">
                <option value="">All statuses</option>
                <option value="initial">Initial</option>
                <option value="process">Process</option>
                <option value="completed">Completed</option>
            </select>
           ${isAdmin ? `
<select id="filter_user" class="bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none transition-colors">
    <option value="">All users</option>
</select>
` : ""}
        </div>

        ${!isAdmin ? `
        <form id="taskForm" class="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3">
            <h2 class="text-white text-sm font-medium">New task</h2>
            <input
                type="text"
                id="task_title"
                placeholder="Title"
                class="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm focus:border-red-500 outline-none transition-colors"
            />
            <textarea
                id="task_description"
                placeholder="Description"
                class="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm resize-none h-20 focus:border-red-500 outline-none transition-colors"
            ></textarea>
            <button class="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Add task
            </button>
        </form>
        ` : `<form id="taskForm" style="display:none"></form>`}

        <div id="tasks_container" class="flex flex-col gap-3"></div>
    </div>
    `
}