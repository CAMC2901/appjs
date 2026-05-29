export default function homeView() {
    const user = JSON.parse(localStorage.getItem("user"))

    return `
    <div class="flex flex-col items-center justify-center h-full min-h-screen gap-6">
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 flex flex-col items-center gap-5 max-w-md w-full">
            <div class="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                ${user?.full_name?.charAt(0)}
            </div>
            <div class="flex flex-col items-center gap-1">
                <h1 class="text-white text-2xl font-semibold">Welcome, ${user?.full_name}</h1>
                <span class="text-xs px-3 py-1 rounded-full font-medium ${user?.role === "admin" ? "bg-red-950 text-red-400" : "bg-zinc-800 text-zinc-400"}">
                    ${user?.role}
                </span>
            </div>
            <p class="text-zinc-500 text-sm text-center">Ready to manage your tasks?</p>
            <a href="#users" class="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Go to tasks
            </a>
        </div>
    </div>
    `
}