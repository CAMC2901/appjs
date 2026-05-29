export default function loginView() {
    return `
    <div class="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
        <div class="col-span-1 bg-zinc-900 grid place-items-center px-8">
            <div class="flex flex-col gap-8 w-full max-w-sm">
                <div class="flex flex-col gap-1">
                    <h1 class="text-white text-3xl font-bold">Welcome back</h1>
                    <p class="text-zinc-400 text-sm">Sign in to your account</p>
                </div>
                <form id="loginForm" class="flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <label class="text-zinc-400 text-xs uppercase tracking-widest">Username</label>
                        <input type="text" id="username" class="bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 outline-none rounded-lg px-4 py-3 text-sm transition-colors" placeholder="john.doe">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-zinc-400 text-xs uppercase tracking-widest">Password</label>
                        <input type="password" id="password" class="bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 outline-none rounded-lg px-4 py-3 text-sm transition-colors" placeholder="••••••••">
                    </div>
                    <button class="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-sm font-medium transition-colors mt-2 cursor-pointer">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
        <div class="hidden md:flex bg-black items-center justify-center">
            <div class="flex flex-col items-center gap-4">
                <div class="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center">
                    <span class="text-white text-4xl font-bold">A</span>
                </div>
                <h2 class="text-white text-2xl font-bold">App</h2>
                <p class="text-zinc-500 text-sm">Manage your tasks efficiently</p>
            </div>
        </div>
    </div>
    `
}