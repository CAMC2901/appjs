export default function notFoundView() {
    return `
    <div class="flex flex-col items-center justify-center min-h-screen gap-4 text-center bg-zinc-950">
        <h1 class="text-8xl font-bold text-zinc-800">404</h1>
        <p class="text-zinc-400 text-lg">Page not found</p>
        <a href="#home" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Go home
        </a>
    </div>
    `
}