export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Только GET/HEAD на корневой путь — остальное отдаём как есть
    if (url.pathname !== '/' || (request.method !== 'GET' && request.method !== 'HEAD')) {
      return env.ASSETS.fetch(request);
    }

    // Проверяем явный выбор пользователя (cookie)
    const cookies = request.headers.get('Cookie') || '';
    const match = cookies.match(/(?:^|;\s*)openclaw-lang=([^;]+)/);
    if (match) {
      const chosen = match[1];
      if (chosen === 'ru') return Response.redirect(new URL('/ru/', url).href, 302);
      if (chosen === 'zh') return Response.redirect(new URL('/zh/', url).href, 302);
      // 'en' → корень, без редиректа
      return env.ASSETS.fetch(request);
    }

    // Автоопределение по Accept-Language
    const acceptLang = (request.headers.get('Accept-Language') || '').toLowerCase();
    // Берём только первый язык; quality values (q=0.9) намеренно игнорируются —
    // для трёх языков (ru/en/zh) достаточно primary preference
    const primary = acceptLang.split(',')[0].split('-')[0];

    if (primary === 'ru') return Response.redirect(new URL('/ru/', url).href, 302);
    if (primary === 'zh') return Response.redirect(new URL('/zh/', url).href, 302);
    // Всё остальное → English (default, корень)
    return env.ASSETS.fetch(request);
  }
}
