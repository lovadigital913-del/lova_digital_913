(() => {
  const admin = document.querySelector('#admin .adminwrap');
  if (!admin) return;
  const fixedWhatsAppUrl = 'https://wa.me/message/DJ3HTYS4GPDIC1';
  // Hidden owner shortcut: tap the brand logo five times within 2 seconds.
  let logoTaps = 0;
  let logoTapTimer;
  document.querySelector('.brand')?.addEventListener('click', event => {
    logoTaps += 1;
    clearTimeout(logoTapTimer);
    logoTapTimer = setTimeout(() => { logoTaps = 0; }, 2000);
    if (logoTaps >= 5) {
      event.preventDefault();
      event.stopPropagation();
      logoTaps = 0;
      document.querySelector('[data-page="admin"]')?.click();
    }
  }, true);
  const configured = window.LOVA_SUPABASE_URL && window.LOVA_SUPABASE_KEY &&
    !String(window.LOVA_SUPABASE_URL).includes('YOUR_') &&
    !String(window.LOVA_SUPABASE_KEY).includes('YOUR_');

  const loginBox = document.createElement('div');
  loginBox.className = 'adminbox';
  loginBox.id = 'sharedLogin';
  loginBox.innerHTML = '<h2>بەڕێوەبردنی هاوبەش</h2><p class="hint" id="sharedStatus"></p>' +
    '<div class="formgrid" id="loginFields"><input class="field" id="ownerEmail" type="email" autocomplete="username" placeholder="ئیمەیڵی بەڕێوەبەر">' +
    '<input class="field" id="ownerPassword" type="password" autocomplete="current-password" placeholder="وشەی نهێنی بەڕێوەبەر">' +
    '<button class="btn solid" id="ownerLogin">چوونەژوورەوە</button></div>' +
    '<button class="btn" id="ownerLogout" style="display:none">چوونەدەرەوە</button>';
  admin.querySelector('.pagehead').after(loginBox);
  const homeBox = document.createElement('div');
  homeBox.className = 'adminbox';
  homeBox.innerHTML = '<h2>✦ دەستکاریکردنی پەڕەی سەرەکی</h2><p class="hint">سەردێڕ، وەسف، دوگمە و وێنەی گەورەی سەرەتا بگۆڕە؛ پاشان پاشەکەوتی بکە بۆ ئەوەی لە ماڵپەڕی خەڵکیش نوێ ببێتەوە.</p><div class="formgrid"><input class="field" id="homeEyebrow" placeholder="دەقی بچوکی سەرەوە"><input class="field" id="homeTitleFirst" placeholder="ڕیزی یەکەمی سەردێڕ"><input class="field" id="homeTitleAccent" placeholder="ڕیزی دووەمی سەردێڕ"><input class="field" id="homeBadgeOne" placeholder="بەشی بچوکی سەر وێنە"><input class="field" id="homeBadgeTwo" placeholder="بەشی بچوکی خوار وێنە"><input class="field" id="homeButtonWork" placeholder="دەقی دوگمەی کارەکان"><input class="field" id="homeButtonContact" placeholder="دەقی دوگمەی پەیوەندی"><input class="field" id="homeImageUrl" placeholder="لینکی وێنەی سەرەکی (ئارەزوومەندانە)"><textarea class="field" id="homeDescription" placeholder="وەسفی پەڕەی سەرەکی"></textarea><input class="field upload-field" id="homeImageFile" type="file" accept="image/*" aria-label="هەڵبژاردنی وێنەی سەرەکی"><button class="btn solid" id="saveHome">پاشەکەوتکردنی پەڕەی سەرەکی</button></div>';
  loginBox.after(homeBox);
  const textGroups = [
    ['پەڕەی سەرەکی', [['homeNav','ناوی پەڕە لە مینیو'],['servicesEyebrow','سەردێڕی بچوکی خزمەتگوزاری'],['servicesTitle','سەردێڕی خزمەتگوزاری'],['servicesDescription','کورتەی خزمەتگوزاری'],['serviceGraphicTitle','ناوی خزمەتی گرافیک'],['serviceGraphicText','وەسفی خزمەتی گرافیک'],['serviceWebTitle','ناوی خزمەتی وێبسایت'],['serviceWebText','وەسفی خزمەتی وێبسایت'],['serviceDigitalTitle','ناوی خزمەتی دیجیتاڵ'],['serviceDigitalText','وەسفی خزمەتی دیجیتاڵ'],['homeCtaTitle','سەردێڕی کۆتایی پەڕە'],['homeCtaText','دەقی کۆتایی پەڕە'],['platformsEyebrow','سەردێڕی پلاتفۆرمەکان'],['platformsTitle','ناونیشانی بەشی پلاتفۆرمەکان'],['platformsSubtitle','دەقی بەشی پلاتفۆرمەکان']]],
    ['پەڕەی گرافیک دیزاین', [['graphicsNav','ناوی لە مینیو'],['graphicsEyebrow','سەردێڕی بچووک'],['graphicsTitle','ناونیشانی پەڕە'],['graphicsSubtitle','کورتەی پەڕە']]],
    ['پەڕەی وێبسایت', [['websitesNav','ناوی لە مینیو'],['websitesEyebrow','سەردێڕی بچووک'],['websitesTitle','ناونیشانی پەڕە'],['websitesSubtitle','کورتەی پەڕە']]],
    ['پەڕەی پەیوەندی', [['contactNav','ناوی لە مینیو'],['contactEyebrow','سەردێڕی بچووک'],['contactTitle','ناونیشانی پەڕە'],['contactSubtitle','کورتەی پەڕە'],['contactBoxTitle','ناونیشانی خانەی پەیوەندی'],['contactBoxText','دەقی خانەی پەیوەندی']]]
  ];
  const longTextKeys = new Set(['servicesDescription','serviceGraphicText','serviceWebText','serviceDigitalText','homeCtaText','platformsSubtitle','graphicsSubtitle','websitesSubtitle','contactSubtitle','contactBoxText']);
  const pageTextBox = document.createElement('div');
  pageTextBox.className = 'adminbox';
  pageTextBox.id = 'pageCopyBox';
  pageTextBox.innerHTML = '<h2>✎ دەستکاریکردنی ناو و دەقی پەڕەکان</h2><p class="hint">ناوی مینیو، سەردێڕ و دەقی پەڕەکان بگۆڕە؛ پەیوەندی هەمیشە لە دوای پەڕە نوێکان دەمێنێتەوە.</p>' + textGroups.map(([title, fields]) => `<section class="page-copy-group"><h3>${title}</h3><div class="formgrid">${fields.map(([key,label]) => `<label class="page-copy-field"><span>${label}</span>${longTextKeys.has(key)?`<textarea class="field" id="pagecopy-${key}"></textarea>`:`<input class="field" id="pagecopy-${key}">`}</label>`).join('')}</div></section>`).join('') + '<button class="btn solid" id="savePageCopy">پاشەکەوتکردنی دەقەکان</button>';
  homeBox.after(pageTextBox);
  const customPagesBox = document.createElement('div');
  customPagesBox.className = 'adminbox';
  customPagesBox.innerHTML = '<h2>＋ زیادکردنی پەڕەی نوێ</h2><p class="hint">جۆری پەڕە هەڵبژێرە؛ ئایکۆنی گونجاو خۆکار دادەنرێت. پەیوەندی هەمیشە لە کۆتایی مینیو دەمێنێتەوە.</p><div class="formgrid"><input class="field" id="newPageTitle" placeholder="ناوی پەڕە"><input class="field" id="newPageNav" placeholder="ناوی کورت بۆ مینیو (ئارەزوومەندانە)"><select class="field" id="newPageIcon"><option value="website">وێبسایت · ئایکۆنی شاشە</option><option value="graphics">گرافیک · ئایکۆنی پەلێت</option><option value="portfolio">پۆرتفۆلیۆ · ئایکۆنی پەڕگە</option><option value="services">خزمەتگوزاری · ئایکۆنی بیرۆکە</option><option value="shop">فرۆشگا · ئایکۆنی سەبەتە</option><option value="contact">پەیوەندی · ئایکۆنی گفتوگۆ</option><option value="general">پەڕەی گشتی · ئایکۆنی خانە</option></select><input class="field" id="newPageEyebrow" placeholder="دەقی بچوکی سەرەوە"><input class="field" id="newPageSubtitle" placeholder="کورتەی پەڕە"><input class="field" id="newPageImageUrl" placeholder="لینکی وێنە (ئارەزوومەندانە)"><textarea class="field" id="newPageContent" placeholder="دەقی ناو پەڕە"></textarea><input class="field upload-field" id="newPageImageFile" type="file" accept="image/*" aria-label="وێنەی پەڕەی نوێ"><button class="btn solid" id="addCustomPage">زیادکردنی پەڕە</button></div><h3>پەڕە زیادکراوەکان</h3><div class="adminlist" id="adminCustomPages"></div>';
  pageTextBox.after(customPagesBox);
  const customManager = document.createElement('div');
  customManager.className = 'adminbox';
  customManager.id = 'customPageManager';
  customManager.innerHTML = '<h2>✦ لیست و نموونەی پەڕە نوێکان</h2><p class="hint">پەڕەیەک هەڵبژێرە، لیستی نوێ دروست بکە و نموونەی وێنەدار زیاد بکە.</p><div class="formgrid"><select class="field" id="manageCustomPage"></select><div class="formgrid"><input class="field" id="newCustomCategory" placeholder="ناوی لیستی نوێ، وەک لۆگۆ"><button class="btn" id="addCustomCategory">＋ زیادکردنی لیست</button></div><div class="adminlist" id="customCategoryRows"></div><h3>＋ زیادکردنی نموونە</h3><select class="field" id="customSampleCategory"></select><input class="field" id="customSampleTitle" placeholder="ناوی نموونە"><input class="field" id="customSampleImageUrl" placeholder="لینکی وێنە (ئارەزوومەندانە)"><input class="field upload-field" id="customSampleImageFile" type="file" accept="image/*" aria-label="وێنەی نموونە"><textarea class="field" id="customSampleDesc" placeholder="کورتەی نموونە"></textarea><input class="field" id="customSampleLink" placeholder="لینکی وێبسایت (ئارەزوومەندانە)"><button class="btn solid" id="addCustomSample">زیادکردنی نموونە</button></div><h3>نموونەکانی ئەم پەڕەیە</h3><div class="adminlist" id="customSampleRows"></div>';
  customPagesBox.after(customManager);
  const pageAdminStyle = document.createElement('style');
  pageAdminStyle.textContent = '.page-copy-group{padding:14px 0;border-top:1px solid #ffffff14}.page-copy-group h3{color:#d8b5ff}.page-copy-field{display:grid;gap:6px;color:#c9c0d2;font-size:13px}.page-copy-field textarea{min-height:68px}.custom-page-content{margin-bottom:30px}';
  document.head.append(pageAdminStyle);
  ['gCategory', 'sCategory'].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    const kind = id === 'gCategory' ? 'graphics' : 'sites';
    const group = document.createElement('div');
    group.className = 'category-control';
    select.parentNode.insertBefore(group, select);
    group.append(select);
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'delete';
    removeButton.textContent = 'لابردنی جۆری هەڵبژێردراو';
    removeButton.addEventListener('click', () => {
      const lists = kind === 'graphics' ? graphicLists : websiteLists;
      const index = lists.indexOf(select.value);
      if (index < 0) return toast('جۆرێک هەڵبژێرە بۆ لابردن.');
      document.querySelector(`[data-list-remove="${kind}"][data-index="${index}"]`)?.click();
    });
    group.append(removeButton);
  });
  const categoryStyle = document.createElement('style');
  categoryStyle.textContent = '.category-control{display:grid;gap:8px;min-width:0}.category-control .field{width:100%}';
  document.head.append(categoryStyle);
  admin.querySelector('.pagehead .sub').textContent = 'لە بەڕێوەبردنەوە ناوەڕۆکی پەڕەی سەرەکی، نموونەکان و پلاتفۆرمەکان بگۆڕە؛ پاشەکەوتەکان لە Supabase هەڵدەگیرێن و لە ماڵپەڕی گشتی نوێ دەبنەوە.';
  const oldLocalHint = [...admin.querySelectorAll('.hint')].find(element => element.textContent.includes('پاراستنی خۆجێییە'));
  if (oldLocalHint) oldLocalHint.textContent = 'ناوەڕۆکەکان لە Supabase پاشەکەوت دەکرێن و لە هەموو ئامێرێکەوە بەڕێوە دەبرێن.';
  document.getElementById('pUrl')?.insertAdjacentHTML('afterend', '<input class="field upload-field" id="pImageFile" type="file" accept="image/*" aria-label="بارکردنی وێنەی پلاتفۆرم">');
  const status = document.getElementById('sharedStatus');
  const loginFields = document.getElementById('loginFields');
  const loginButton = document.getElementById('ownerLogin');
  const protectedBoxes = [...admin.children].filter(box => box !== loginBox);
  let db = null;
  const ownerEmailAllowed = 'lovadigital913@gmail.com';
  let ownerSignedIn = false;
  let contentLoaded = false;
  let contentLoadPromise = null;
  let localRecoveryPending = false;

  function setAccess() {
    admin.closest('#admin')?.classList.toggle('owner-authenticated', ownerSignedIn);
    protectedBoxes.forEach(box => box.style.display = ownerSignedIn ? '' : 'none');
    loginFields.style.display = ownerSignedIn ? 'none' : 'grid';
    document.getElementById('ownerLogout').style.display = ownerSignedIn ? '' : 'none';
  }
  function refreshLists(cats) {
    ownerCategories = cats || { graphics: [], sites: [] };
    graphicLists = ownerCategories.managed
      ? [...new Set(ownerCategories.graphics || [])]
      : [...new Set([...graphicBase, ...(ownerCategories.graphics || [])])];
    websiteLists = ownerCategories.managed
      ? [...new Set(ownerCategories.sites || [])]
      : [...new Set([...allowedWebsiteTypes, ...(ownerCategories.sites || [])])];
    refreshOwnerControls();
    renderOwnerListTags();
  }
  async function loadContent() {
    const { data: row, error } = await db.from('lova_site_content').select('content').eq('id', 'main').single();
    if (error) throw error;
    const value = row.content || {};
    const sharedContentIsAuthoritative = Number(value.syncVersion || 0) >= 1;
    ['graphics','sites','platforms'].forEach(key => {
      data[key] = Array.isArray(value[key]) ? value[key] : [];
    });
    data.home = { ...homeDefaults, ...(value.home || {}) };
    data.pageSettings = { ...pageSettingsDefaults, ...(value.pageSettings || {}) };
    data.customPages = Array.isArray(value.customPages) ? value.customPages : [];
    const whatsApp = data.platforms.find(item => /whatsapp|واتسئاپ|واتساپ/i.test(item.name || '') || /wa\.me/i.test(item.url || ''));
    if (whatsApp) { whatsApp.name = 'WhatsApp'; whatsApp.url = whatsApp.url || fixedWhatsAppUrl; }
    else data.platforms.unshift({ name: 'WhatsApp', url: fixedWhatsAppUrl });
    const remoteCategories = value.categories || {};
    const localHasCategories = (ownerCategories?.graphics || []).length || (ownerCategories?.sites || []).length;
    if (sharedContentIsAuthoritative || (remoteCategories.graphics || []).length || (remoteCategories.sites || []).length) refreshLists(remoteCategories);
    else refreshLists(ownerCategories);
    localRecoveryPending = false;
    contentLoaded = true;
    fillHomeForm();
    fillPageCopyForm();
    render();
  }
  async function ensureContentLoaded() {
    if (contentLoaded) return true;
    if (!contentLoadPromise) {
      contentLoadPromise = loadContent().then(() => true).catch(error => {
        console.error('Could not load shared site content:', error);
        const detail = String(error?.message || error?.details || 'هەڵەی پەیوەندی').replace(/\s+/g, ' ').slice(0, 100);
        status.textContent = `داتاکان بار نەبوون (${detail}). چوونەژوورەوە دەتوانیت تاقی بکەیتەوە؛ بۆ پاشەکەوتکردن Supabase و SQL دەبێت چالاک بن.`;
        return false;
      }).finally(() => { contentLoadPromise = null; });
    }
    return contentLoadPromise;
  }
  function fillHomeForm() {
    const h = data.home || homeDefaults;
    [['homeEyebrow','eyebrow'],['homeTitleFirst','titleFirst'],['homeTitleAccent','titleAccent'],['homeDescription','description'],['homeImageUrl','image'],['homeBadgeOne','badgeOne'],['homeBadgeTwo','badgeTwo'],['homeButtonWork','buttonWork'],['homeButtonContact','buttonContact']].forEach(([id,key]) => { const input = document.getElementById(id); if (input) input.value = h[key] || ''; });
  }
  function fillPageCopyForm() {
    const settings = data.pageSettings || pageSettingsDefaults;
    Object.keys(pageSettingsDefaults).forEach(key => {
      const input = document.getElementById(`pagecopy-${key}`);
      if (input) input.value = settings[key] || '';
    });
  }
  async function uploadImages(items, group) {
    for (const item of items) {
      if (!item.image || !item.image.startsWith('data:image/')) continue;
      const blob = await (await fetch(item.image)).blob();
      if (blob.size > 5 * 1024 * 1024) throw new Error('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
      const ext = (blob.type.split('/')[1] || 'png').replace('jpeg', 'jpg').replace(/[^a-z0-9]/gi, '');
      const unique = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const path = `${group}/${unique}.${ext}`;
      const { error } = await db.storage.from('lova-images').upload(path, blob, { contentType: blob.type, upsert: false });
      if (error) throw error;
      item.image = db.storage.from('lova-images').getPublicUrl(path).data.publicUrl;
    }
  }
  async function publish() {
    if (!ownerSignedIn) throw new Error('owner sign in required');
    if (!contentLoaded) throw new Error('Supabase content has not loaded; refusing to overwrite shared content.');
    await uploadImages(data.graphics, 'graphics');
    await uploadImages(data.sites, 'websites');
    await uploadImages(data.platforms, 'platforms');
    for (const page of data.customPages) await uploadImages(page.samples || [], `custom-pages/${page.id}`);
    await uploadImages(data.customPages, 'custom-pages');
    if (data.home?.image?.startsWith('data:image/')) await uploadImages([data.home], 'home');
    const content = {
      syncVersion: 1,
      graphics: data.graphics,
      sites: data.sites,
      platforms: data.platforms,
      home: data.home,
      pageSettings: data.pageSettings,
      customPages: data.customPages,
      categories: ownerCategories
    };
    const { data: updated, error } = await db.from('lova_site_content')
      .update({ content, updated_at: new Date().toISOString() }).eq('id', 'main').select('id');
    if (error) throw error;
    if (!updated?.length) throw new Error('ڕێگەی نووسینی داتا پێشتر ڕێکنەخراوە.');
    render();
    toast('گۆڕانکارییەکان بۆ هەموو سەردانکەران پاشەکەوت کران.');
  }

  // All add/edit/delete controls share one ordered save queue so rapid edits
  // cannot race and overwrite a newer version of the shared content.
  let publishQueue = Promise.resolve();
  save = function () {
    if (!ownerSignedIn) return toast('سەرەتا بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.');
    publishQueue = publishQueue.catch(() => {}).then(() => publish());
    return publishQueue.catch(error => {
      console.error(error);
      const detail = String(error?.message || error?.details || error?.hint || 'هەڵەی نەناسراو').replace(/\s+/g, ' ').slice(0, 150);
      toast(`پاشەکەوت نەکرا: ${detail}`);
    });
  };
  adminRows = function (kind, id) {
    document.getElementById(id).innerHTML = data[kind].map((item, i) =>
      `<div class="adminrow"><span>${item.image ? `<img src="${safe(item.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-inline-end:8px">` : ''}${safe(item.title || item.name)} <span class="hint">${safe(item.category || item.url || '')}</span></span><span><button class="btn" data-edit="${kind}" data-index="${i}">دەستکاری</button> <button class="delete" data-remove="${kind}" data-index="${i}">لابردن</button></span></div>`
    ).join('') || '<span class="hint">هیچ دانەیەک نییە.</span>';
  };
  function activeCustomPage() { return data.customPages.find(page => page.id === document.getElementById('manageCustomPage').value); }
  function renderCustomPageManager() {
    const pages = data.customPages || [], pageSelect = document.getElementById('manageCustomPage');
    const selected = pageSelect.value;
    pageSelect.innerHTML = pages.map(page => `<option value="${safe(page.id)}">${safe(page.title)}</option>`).join('') || '<option value="">سەرەتا پەڕەیەکی نوێ زیاد بکە</option>';
    if (pages.some(page => page.id === selected)) pageSelect.value = selected;
    const page = activeCustomPage();
    const cats = page?.categories || [];
    document.getElementById('customCategoryRows').innerHTML = cats.map((name, i) => `<div class="adminrow"><span>${safe(name)}</span><button class="delete" data-custom-category-remove="${i}">لابردن</button></div>`).join('') || '<span class="hint">لیستێک زیاد بکە.</span>';
    document.getElementById('customSampleCategory').innerHTML = cats.map(name => `<option value="${safe(name)}">${safe(name)}</option>`).join('') || '<option value="">سەرەتا لیست دروست بکە</option>';
    document.getElementById('customSampleCategory').disabled = !page || !cats.length;
    document.getElementById('addCustomSample').disabled = !page || !cats.length;
    document.getElementById('customSampleRows').innerHTML = (page?.samples || []).map((sample, i) => `<div class="adminrow"><span>${sample.image ? `<img src="${safe(sample.image)}" alt="" style="width:42px;height:42px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-inline-end:8px">` : ''}${safe(sample.title)} <span class="hint">${safe(sample.category || '')}</span></span><span><button class="btn" data-custom-sample-edit="${i}">دەستکاری</button> <button class="delete" data-custom-sample-remove="${i}">لابردن</button></span></div>`).join('') || '<span class="hint">هێشتا نموونە زیاد نەکراوە.</span>';
  }
  document.getElementById('manageCustomPage').addEventListener('change', renderCustomPageManager);
  document.getElementById('addCustomCategory').addEventListener('click', () => {
    const page = activeCustomPage(), input = document.getElementById('newCustomCategory'), name = input.value.trim();
    if (!page) return toast('پەڕەیەک هەڵبژێرە یان پەڕەی نوێ زیاد بکە.');
    if (!name) return toast('ناوی لیستەکە بنووسە.');
    page.categories = page.categories || [];
    if (page.categories.some(value => value.toLowerCase() === name.toLowerCase())) return toast('ئەم لیستە پێشتر هەیە.');
    page.categories.push(name); input.value = ''; renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
  });
  document.getElementById('addCustomSample').addEventListener('click', () => {
    const page = activeCustomPage(), title = document.getElementById('customSampleTitle').value.trim(), file = document.getElementById('customSampleImageFile').files?.[0];
    if (!page) return toast('پەڕەیەک هەڵبژێرە.');
    if (!(page.categories || []).length) return toast('سەرەتا لیستێک دروست بکە.');
    if (!title) return toast('ناوی نموونەکە بنووسە.');
    if (file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) return toast('وێنەی دروست و بچووکتر لە ٥ مێگابایت هەڵبژێرە.');
    const add = image => {
      page.samples = page.samples || [];
      page.samples.unshift({ title, category:document.getElementById('customSampleCategory').value, image:image || document.getElementById('customSampleImageUrl').value.trim(), desc:document.getElementById('customSampleDesc').value.trim(), url:document.getElementById('customSampleLink').value.trim() });
      publish().then(() => { ['customSampleTitle','customSampleImageUrl','customSampleImageFile','customSampleDesc','customSampleLink'].forEach(id => document.getElementById(id).value = ''); toast('نموونە زیاد و پاشەکەوت کرا.') }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
    };
    if (!file) return add('');
    const reader = new FileReader(); reader.onload = () => add(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  });
  customManager.addEventListener('click', event => {
    const page = activeCustomPage(); if (!page || !ownerSignedIn) return;
    const removeCategory = event.target.closest('[data-custom-category-remove]');
    if (removeCategory) { const index = Number(removeCategory.dataset.customCategoryRemove), name = page.categories[index]; if (!confirm(`لیستی «${name}» لاببرێت؟ نموونەکان دەمێننەوە و بەبێ جۆر پیشان دەدرێن.`)) return; page.categories.splice(index,1); (page.samples || []).forEach(sample => { if (sample.category === name) sample.category = ''; }); renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); return; }
    const remove = event.target.closest('[data-custom-sample-remove]');
    if (remove) { const index = Number(remove.dataset.customSampleRemove); if (!confirm('ئەم نموونەیە بسڕمەوە؟')) return; page.samples.splice(index,1); renderCustomPageManager(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); return; }
    const edit = event.target.closest('[data-custom-sample-edit]');
    if (edit) { const sample = page.samples[Number(edit.dataset.customSampleEdit)]; if (!sample) return; const title = prompt('ناوی نموونە:', sample.title || ''); if (title === null) return; const category = prompt('ناوی لیست:', sample.category || ''); if (category === null) return; const desc = prompt('کورتەی نموونە:', sample.desc || ''); if (desc === null) return; const url = prompt('لینکی وێبسایت (ئارەزوومەندانە):', sample.url || ''); if (url === null) return; const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ هێشتنەوەی وێنەی ئێستا):', sample.image || ''); if (image === null) return; sample.title=title.trim(); sample.category=category.trim(); sample.desc=desc.trim(); sample.url=url.trim(); if (image.trim()) sample.image=image.trim(); publish().catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`)); }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-edit]');
    if (!button || !ownerSignedIn) return;
    const kind = button.dataset.edit, item = data[kind]?.[Number(button.dataset.index)];
    if (!item) return;
    if (kind === 'customPages') {
      const title = prompt('ناوی پەڕە:', item.title || ''); if (title === null) return;
      const navTitle = prompt('ناوی پەڕە لە مینیو:', item.navTitle || item.title || ''); if (navTitle === null) return;
      const eyebrow = prompt('دەقی بچوکی سەرەوە:', item.eyebrow || ''); if (eyebrow === null) return;
      const subtitle = prompt('کورتەی پەڕە:', item.subtitle || ''); if (subtitle === null) return;
      const content = prompt('دەقی ناو پەڕە:', item.content || ''); if (content === null) return;
      const icon = prompt('ئایکۆن: website / graphics / portfolio / services / shop / contact / general', item.icon || 'general'); if (icon === null) return;
      const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ وێنەی پێشوو):', item.image || ''); if (image === null) return;
      item.title = title.trim(); item.navTitle = navTitle.trim(); item.eyebrow = eyebrow.trim(); item.subtitle = subtitle.trim(); item.content = content.trim();
      item.icon = ['website','graphics','portfolio','services','shop','contact','general'].includes(icon.trim()) ? icon.trim() : 'general';
      if (image.trim()) item.image = image.trim();
      save('customPages');
      return;
    }
    const titleKey = kind === 'platforms' ? 'name' : 'title';
    const title = prompt('ناو:', item[titleKey] || ''); if (title === null) return;
    const category = kind === 'platforms' ? item.category : prompt('جۆر/لیست:', item.category || '');
    if (kind !== 'platforms' && category === null) return;
    const link = kind === 'platforms' ? prompt('بەستەری پلاتفۆرم:', item.url || '') : item.url;
    if (kind === 'platforms' && link === null) return;
    const desc = kind === 'platforms' ? item.desc : prompt('کورتەی نموونە:', item.desc || '');
    if (kind !== 'platforms' && desc === null) return;
    const image = prompt('لینکی وێنە (بەتاڵ بهێڵە بۆ وێنەی پێشوو):', item.image || '');
    if (image === null) return;
    item[titleKey] = title.trim();
    if (kind === 'platforms') item.url = link.trim();
    else { item.category = category.trim(); item.desc = desc.trim(); }
    if (image.trim()) item.image = image.trim();
    save(kind);
  });
  document.getElementById('addPlatform').onclick = () => {
    const name = document.getElementById('pName').value.trim();
    let url = document.getElementById('pUrl').value.trim();
    if (!name || !url) return toast('ناو و لینکی پلاتفۆرم بنووسە.');
    if (/whatsapp|واتسئاپ|واتساپ/i.test(name) && /^\+?[\d\s()-]{7,}$/.test(url)) url = 'https://wa.me/' + url.replace(/\D/g, '');
    else if (!/^(https?:|mailto:|tel:)/i.test(url)) url = 'https://' + url;
    const file = document.getElementById('pImageFile').files?.[0];
    const add = image => {
      data.platforms.unshift({ name, url, image });
      save('platforms');
      document.getElementById('pName').value = document.getElementById('pUrl').value = '';
      document.getElementById('pImageFile').value = '';
    };
    if (!file) return add('');
    if (!file.type.startsWith('image/')) return toast('تەنها فایلێکی وێنە هەڵبژێرە.');
    if (file.size > 5 * 1024 * 1024) return toast('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
    const reader = new FileReader(); reader.onload = () => add(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  document.getElementById('saveHome').onclick = () => {
    const h = data.home || (data.home = { ...homeDefaults });
    h.eyebrow = document.getElementById('homeEyebrow').value.trim();
    h.titleFirst = document.getElementById('homeTitleFirst').value.trim();
    h.titleAccent = document.getElementById('homeTitleAccent').value.trim();
    h.description = document.getElementById('homeDescription').value.trim();
    h.badgeOne = document.getElementById('homeBadgeOne').value.trim();
    h.badgeTwo = document.getElementById('homeBadgeTwo').value.trim();
    h.buttonWork = document.getElementById('homeButtonWork').value.trim();
    h.buttonContact = document.getElementById('homeButtonContact').value.trim();
    h.image = document.getElementById('homeImageUrl').value.trim() || h.image || 'logo.jpg';
    const file = document.getElementById('homeImageFile').files?.[0];
    const finish = () => publish().then(() => { document.getElementById('homeImageFile').value = ''; fillHomeForm(); }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || 'هەڵەی نەناسراو').slice(0,120)}`));
    if (!file) return finish();
    if (!file.type.startsWith('image/')) return toast('تەنها فایلێکی وێنە هەڵبژێرە.');
    if (file.size > 5 * 1024 * 1024) return toast('وێنەکە گەورەیە؛ وێنەی بچووکتر هەڵبژێرە.');
    const reader = new FileReader(); reader.onload = () => { h.image = String(reader.result); finish(); }; reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  document.getElementById('savePageCopy').onclick = () => {
    const settings = data.pageSettings || (data.pageSettings = { ...pageSettingsDefaults });
    Object.keys(pageSettingsDefaults).forEach(key => { const field = document.getElementById(`pagecopy-${key}`); if (field) settings[key] = field.value.trim(); });
    publish().then(() => toast('ناو و دەقی پەڕەکان پاشەکەوت کران.')).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
  };
  document.getElementById('addCustomPage').onclick = () => {
    const title = document.getElementById('newPageTitle').value.trim();
    if (!title) return toast('ناوی پەڕەکە بنووسە.');
    const imageUrl = document.getElementById('newPageImageUrl').value.trim();
    const file = document.getElementById('newPageImageFile').files?.[0];
    if (file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024)) return toast('وێنەی دروست و بچووکتر لە ٥ مێگابایت هەڵبژێرە.');
    const addPage = image => {
      data.customPages.unshift({ id:`page-${Date.now().toString(36)}`, title, navTitle:document.getElementById('newPageNav').value.trim()||title, icon:document.getElementById('newPageIcon').value, eyebrow:document.getElementById('newPageEyebrow').value.trim(), subtitle:document.getElementById('newPageSubtitle').value.trim(), content:document.getElementById('newPageContent').value.trim(), image:image||imageUrl, categories:[], samples:[] });
      renderCustomPageManager();
      publish().then(() => { ['newPageTitle','newPageNav','newPageEyebrow','newPageSubtitle','newPageImageUrl','newPageContent','newPageImageFile'].forEach(id=>{document.getElementById(id).value=''}); toast('پەڕەی نوێ زیاد و پاشەکەوت کرا.') }).catch(error => toast(`پاشەکەوت نەکرا: ${String(error?.message || '').slice(0,100)}`));
    };
    if (!file) return addPage('');
    const reader = new FileReader(); reader.onload = () => addPage(String(reader.result)); reader.onerror = () => toast('خوێندنەوەی وێنەکە سەرکەوتوو نەبوو.'); reader.readAsDataURL(file);
  };
  const originalRender = render;
  render = function () {
    originalRender();
    adminRows('customPages', 'adminCustomPages');
    renderCustomPageManager();
    document.querySelectorAll('#contactPlatforms .platform').forEach((element, i) => {
      const platform = data.platforms[i];
      if (platform?.image) element.innerHTML = `<img src="${safe(platform.image)}" alt="" style="width:26px;height:26px;object-fit:cover;border-radius:7px;vertical-align:middle;margin-inline-end:7px">${safe(platform.name)}`;
    });
  };
  ['makeGraphicList', 'makeSiteList'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => setTimeout(() => {
      if (ownerSignedIn) publish().catch(() => toast('لیستەکە پاشەکەوت نەکرا.'));
    }, 0));
  });

  if (!configured || !window.supabase?.createClient) {
    status.textContent = 'پڕۆژەی Supabase پەیوەست نییە. بۆ چالاککردنی بەڕێوەبردن، settings لە supabase-config.js دابنێ.';
    setAccess();
    return;
  }
  db = window.supabase.createClient(window.LOVA_SUPABASE_URL, window.LOVA_SUPABASE_KEY, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  setAccess();
  loginButton.disabled = false;
  status.textContent = 'ئیمەیڵ و وشەی نهێنی بنووسە بۆ چوونەژوورەوە.';

  loginButton.addEventListener('click', async () => {
    const email = document.getElementById('ownerEmail').value.trim();
    const password = document.getElementById('ownerPassword').value;
    if (!email || !password) { status.textContent = 'تکایە ئیمەیڵ و وشەی نهێنی پڕ بکەرەوە.'; return toast('ئیمەیڵ و وشەی نهێنی بنووسە.'); }
    const button = document.getElementById('ownerLogin');
    button.disabled = true;
    status.textContent = 'چوونەژوورەوە پشکنین دەکرێت...';
    try {
      const { data: authData, error } = await db.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Admin sign-in failed:', error);
        status.textContent = 'چوونەژوورەوە سەرکەوتوو نەبوو. لە Supabase > Authentication > Users دڵنیابە هەژمارەکە دروستکراوە و ئیمەیڵەکە پشتڕاست کراوەتەوە.';
        return toast('ئیمەیڵ یان وشەی نهێنی لە Supabase دروست نییە، یان هەژمارەکە پشتڕاست نەکراوەتەوە.');
      }
      if (String(authData?.user?.email || '').toLowerCase() !== ownerEmailAllowed) {
        await db.auth.signOut();
        status.textContent = `تەنها ${ownerEmailAllowed} دەسەڵاتی بەڕێوەبردنی هەیە.`;
        return toast('ئەم ئیمەیڵە دەسەڵاتی بەڕێوەبەری نییە.');
      }
      ownerSignedIn = true;
      setAccess();
      document.getElementById('ownerPassword').value = '';
      const loaded = await ensureContentLoaded();
      let recovered = false;
      let recoveryNote = '';
      if (loaded && localRecoveryPending) {
        try { await publish(); localRecoveryPending = false; recovered = true; }
        catch (migrationError) { console.error('Local sample migration is still pending:', migrationError); recoveryNote = ' داتای کۆن لەم وێبگەڕە پیشان دەدرێت، بەڵام بۆ پاراستنی ئۆنلاین پێویستە Storage و policyی Supabase چالاک بێت.'; }
      }
      status.textContent = loaded
        ? 'چوویتە ژوورەوە؛ ئێستا دەتوانیت بەشی بەڕێوەبردن بەکاربهێنیت.' + recoveryNote
        : 'چوویتە ژوورەوە، بەڵام داتاکانی Supabase بار نەبوون. SQL و ڕێکخستنی داتابەیس بپشکنە؛ گۆڕانکارییەکان تا ئەو کاتە پاشەکەوت نابن.';
      if (loaded) toast(recovered ? 'نموونە پاشەکەوتکراوەکانی وێبگەڕ گەڕێندرایەوە و پاشەکەوت کران.' : 'چوویتە ژوورەوە.');
    } catch (error) {
      console.error('Admin sign-in error:', error);
      status.textContent = 'پەیوەندی بە Supabase نەکرا. ئینتەرنێت و supabase-config.js بپشکنە.';
      toast('پەیوەندی بە Supabase نەکرا؛ دووبارە هەوڵ بدە.');
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById('ownerLogout').addEventListener('click', async () => {
    await db.auth.signOut();
  });

  db.auth.onAuthStateChange((_event, session) => {
    ownerSignedIn = String(session?.user?.email || '').toLowerCase() === ownerEmailAllowed;
    setAccess();
    if (session && !ownerSignedIn) db.auth.signOut();
    if (!ownerSignedIn) status.textContent = 'بۆ بینینی فۆڕمەکانی بەڕێوەبردن بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.';
  });

  ensureContentLoaded().then(loaded => {
    if (ownerSignedIn) {
      status.textContent = loaded
        ? 'چوویتە ژوورەوە؛ دەتوانیت بەشی بەڕێوەبردن بەکاربهێنیت.'
        : 'داتاکان بار نەبوون؛ Supabase و SQL بپشکنە.';
    } else if (loaded) {
      status.textContent = 'بۆ بینینی فۆڕمەکانی بەڕێوەبردن بە ئیمەیڵ و وشەی نهێنی بچۆ ژوورەوە.';
    }
  });
  // Keep public pages fresh for visitors who leave the page open. New visitors
  // still get the current database version on their first page load.
  let publicRefreshBusy = false;
  async function refreshPublicContent() {
    if (ownerSignedIn || document.hidden || publicRefreshBusy || !db) return;
    publicRefreshBusy = true;
    try { await loadContent(); } catch (error) { console.error('Public content refresh failed:', error); }
    finally { publicRefreshBusy = false; }
  }
  window.setInterval(refreshPublicContent, 20000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshPublicContent(); });
})();
