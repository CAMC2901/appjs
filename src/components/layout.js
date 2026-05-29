const views = [
  { name: "Home",  route: "#home",  role: ["admin", "user"], icon: "🏠" },
  { name: "Tasks", route: "#users", role: ["admin", "user"], icon: "📋" }
]

function renderRoutes() {
  const user = JSON.parse(localStorage.getItem("user"))
  return views
    .filter(view => view.role.includes(user.role))
    .map(view => `
      <a href="${view.route}" class="flex items-center gap-2 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-lg text-sm transition-colors">
        <span>${view.icon}</span>
        <span>${view.name}</span>
      </a>
    `)
    .join("")
}

function logout() {
  localStorage.removeItem("user")
  window.location.hash = "login"
}

export default function layout() {
  const user = JSON.parse(localStorage.getItem("user"))
  const routes = renderRoutes()

  setTimeout(() => {
    document.getElementById("btn_logout")?.addEventListener("click", logout)
  }, 0)

  return `
    <div class="flex min-h-screen bg-zinc-950">
      <aside class="w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between py-6 px-3 fixed h-full">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-2 px-3">
            <div class="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xs font-bold">A</span>
            </div>
            <span class="text-white font-semibold text-sm">App</span>
          </div>
          <nav class="flex flex-col gap-1">
            ${routes}
          </nav>
        </div>
        <div class="flex flex-col gap-3 px-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ${user?.full_name?.charAt(0)}
            </div>
            <div class="flex flex-col">
              <span class="text-white text-xs font-medium">${user?.full_name}</span>
              <span class="text-zinc-500 text-xs">${user?.role}</span>
            </div>
          </div>
          <button id="btn_logout" class="w-full text-left text-zinc-400 hover:text-red-400 text-xs px-2 py-1 rounded transition-colors cursor-pointer">
            Sign out
          </button>
        </div>
      </aside>
      <main id="principal_content" class="ml-56 flex-1 p-8 bg-zinc-950">
      </main>
    </div>
  `
}