import { test, expect, type Route } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/about/', '/projects/', '/experience/', '/engineering/', '/resume/', '/contact/', '/projects/transaction-intelligence-lab/', '/projects/carswafi/', '/projects/banking-integrations/'];

test('simple navigation, accessible content and real resume', async ({ page, context }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software engineer.');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.locator('h1').evaluate(element => getComputedStyle(element).fontFamily.toLowerCase())).toContain('montserrat');
  expect(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily.toLowerCase())).toContain('inter');
  expect(await page.locator('.hero-description').evaluate(element => getComputedStyle(element).fontFamily.toLowerCase())).toContain('montserrat');
  expect(await page.locator('h1').evaluate(element => getComputedStyle(element).fontWeight)).toBe('600');
  expect(await page.locator('.hero-description').evaluate(element => getComputedStyle(element).fontWeight)).toBe('400');
  expect(await page.locator('.hero-cta .button').first().evaluate(element => getComputedStyle(element).fontWeight)).toBe('500');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('.header .brand-wordmark')).toHaveCount(0);
  await expect(page.locator('.header').getByRole('link', { name: 'Elisha Matanga home' })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 900));
  expect(await page.locator('.header-shell').evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.getByRole('group', { name: /Filter|Explore/ })).toHaveCount(0);
  await page.getByRole('link', { name: 'View my work' }).click();
  await expect(page).toHaveURL(/#work$/);
  expect(await page.locator('#work').evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(70);
  await page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'Carswafi', exact: true }) }).click();
  await expect(page).toHaveURL('/projects/carswafi/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Carswafi');
  await page.goto('/');
  await page.screenshot({ path: `test-results/home-${testInfo.project.name}.png`, fullPage: true });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const before = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  expect(await page.locator('html').getAttribute('data-theme')).not.toBe(before);
  await page.goto('/');
  expect(await page.locator('html').getAttribute('data-theme')).not.toBe(before);
  await page.screenshot({ path: `test-results/home-dark-${testInfo.project.name}.png`, fullPage: true });
  if (testInfo.project.name === 'mobile') {
    const open = page.getByRole('button', { name: 'Open navigation' });
    await open.click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(open).toBeFocused();
    await open.press('Enter');
    await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL('/about/');
  }
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
    expect((await new AxeBuilder({ page }).analyze()).violations, route).toEqual([]);
  }
  await page.goto('/contact/');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.locator('.copy-control').getByRole('status')).toHaveText('Email copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('matangaelisha@gmail.com');
  await page.goto('/resume/');
  await expect(page.locator('object')).toHaveAttribute('type', 'application/pdf');
  const pdf = await page.request.get('/documents/elisha-awiti-matanga-resume.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download PDF' }).click();
  expect((await download).suggestedFilename()).toBe('elisha-awiti-matanga-resume.pdf');
  await expect(page.getByRole('status')).toHaveText('Download requested. Thanks for taking a closer look.');
  expect(errors).toEqual([]);
});

test('responsive matrix, keyboard links and reduced motion', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Run the explicit viewport matrix once.');
  test.setTimeout(120000);
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const overflow = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(element => { const box = element.getBoundingClientRect(); return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1); }).map(element => `${element.tagName}.${element.className}`));
      expect(overflow, `${width}px ${route}`).toEqual([]);
      if (route === '/' && [320, 390, 768, 1440, 1920].includes(width)) await page.screenshot({ path: `test-results/responsive-${width}.png`, fullPage: true });
    }
  }
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  const firstProject = page.locator('.project-card').first().getByRole('link');
  await firstProject.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/projects/transaction-intelligence-lab/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
});


test('contact form validates and handles provider responses without sending email', async ({ page }, testInfo) => {
  let pending: Route | undefined;
  let submitted: Record<string, string> | undefined;
  let count = 0;
  await page.route('https://formsubmit.co/ajax/**', route => { count++; submitted = route.request().postDataJSON(); pending = route; });
  await page.goto('/contact/');
  await expect(page.locator('.contact-details h2')).toHaveText('Get In Touch');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Let’s Work Together');
  expect(await page.locator('.contact-intro').evaluate(element => getComputedStyle(element).textAlign)).toBe('center');
  await expect(page.locator('.footer-contact')).not.toBeVisible();
  const detailsBox = await page.locator('.contact-details').boundingBox();
  const formBox = await page.locator('.contact-form').boundingBox();
  expect(Math.abs(detailsBox!.width - formBox!.width)).toBeLessThan(1);
  if (testInfo.project.name === 'desktop') expect(Math.abs(detailsBox!.y - formBox!.y)).toBeLessThan(1);
  else expect(formBox!.y).toBeGreaterThan(detailsBox!.y + detailsBox!.height);
  const nameBox = await page.locator('#contact-name').boundingBox();
  const emailBox = await page.locator('#contact-email').boundingBox();
  expect(Math.abs(nameBox!.x - emailBox!.x)).toBeLessThan(1);
  expect(emailBox!.y).toBeGreaterThan(nameBox!.y + nameBox!.height);
  expect(await page.locator('#contact-name').evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
  await page.screenshot({ path: `test-results/contact-initial-${testInfo.project.name}.png`, fullPage: true });
  const form = page.getByRole('form', { name: 'Send a Message' });
  const send = form.getByRole('button', { name: 'Send Message' });
  await send.click();
  expect(await form.locator('#contact-name').evaluate(input => (input as HTMLInputElement).validity.valueMissing)).toBe(true);
  expect(count).toBe(0);
  await form.getByLabel('Full Name').fill('  ');
  await form.getByLabel(/^Email/).fill('visitor@example.com');
  await form.getByLabel(/^Message/).fill('          ');
  await send.click();
  await expect(form.getByRole('status')).toContainText('Please complete your name, email, and message.');
  expect(count).toBe(0);
  await form.getByLabel('Full Name').fill('Portfolio Visitor');
  await form.getByLabel(/^Message/).fill('This is a fictional test message, intercepted locally.');
  await send.click();
  await expect(form.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  await expect(form.getByLabel(/^Message/)).toBeDisabled();
  await expect(form.getByRole('status')).toContainText('Sending your message');
  await expect(form.getByRole('status')).not.toContainText('Thanks for reaching out.');
  await expect.poll(() => Boolean(pending)).toBe(true);
  expect(submitted?.name).toBe('Portfolio Visitor');
  expect(submitted?.email).toBe('visitor@example.com');
  expect(submitted?._subject).toContain('portfolio enquiry');
  await pending!.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: 'true', message: 'Success' }) });
  await expect(form.getByRole('status')).toContainText('Your message was submitted.');
  await expect(form.getByRole('status')).toHaveClass(/form-feedback-success/);
  await expect(form.getByRole('status')).toBeFocused();
  expect(await form.evaluate(element => element.firstElementChild?.getAttribute('role'))).toBe('status');
  const successBox = await form.getByRole('status').boundingBox();
  expect(successBox!.y).toBeGreaterThanOrEqual(80);
  await page.screenshot({ path: `test-results/contact-success-${testInfo.project.name}.png`, fullPage: false });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `test-results/contact-success-dark-${testInfo.project.name}.png`, fullPage: false });
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  await form.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(form.getByRole('status')).toBeEmpty();
  await expect(form.getByLabel('Full Name')).toBeFocused();
  await expect(form.getByLabel('Full Name')).toHaveValue('');
  expect(count).toBe(1);
  pending = undefined;
  await form.getByLabel('Full Name').fill('Portfolio Visitor');
  await form.getByLabel(/^Email/).fill('visitor@example.com');
  await form.getByLabel(/^Message/).fill('Preserve this message if a network request fails.');
  await send.click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending!.abort('failed');
  await expect(form.getByRole('status')).toContainText('could not be confirmed');
  await expect(form.getByLabel(/^Message/)).toHaveValue('Preserve this message if a network request fails.');
  pending = undefined;
  await send.click();
  await expect.poll(() => Boolean(pending)).toBe(true);
  await pending!.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: false, message: 'Please activate this form using the email confirmation.' }) });
  await expect(form.getByRole('status')).toContainText('awaiting email confirmation');
  await expect(form.getByLabel(/^Message/)).toHaveValue('Preserve this message if a network request fails.');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `test-results/contact-${testInfo.project.name}.png`, fullPage: true });
});


test('Concept 2 identity, navigation and motion', async ({ page }, testInfo) => {
  await page.goto('/');
  const logo = page.locator('.header > .brand .brand-mark');
  await expect(logo).toHaveAttribute('viewBox', '0 0 80 64');
  await expect(logo.locator('text')).toHaveCount(0);
  await expect(logo.locator('.brand-stroke')).toHaveCount(2);
  expect(await page.locator('svg.brand-mark linearGradient').evaluateAll(elements => new Set(elements.map(element => element.id)).size)).toBe(await page.locator('svg.brand-mark linearGradient').count());
  const box = await logo.boundingBox();
  expect(Math.abs(box!.width / box!.height - 1.25)).toBeLessThan(.01);
  const headerBox = await page.locator('.header').boundingBox();
  expect(Math.abs(box!.y + box!.height / 2 - (headerBox!.y + headerBox!.height / 2))).toBeLessThan(1);
  await expect(page.locator('.header')).toHaveCSS('height', testInfo.project.name === 'mobile' ? '70px' : '80px');
  await expect(logo.locator('.brand-stroke').first()).toHaveCSS('animation-name', 'none');
  await page.screenshot({ path: `test-results/identity-light-${testInfo.project.name}.png`, fullPage: false });
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation menu' });
    await expect(dialog.locator('.brand-mark')).toBeVisible();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({ path: 'test-results/identity-mobile-menu.png', fullPage: false });
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  } else {
    const active = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work', exact: true });
    await expect(active).toHaveAttribute('aria-current', 'page');
    await expect(active).toHaveCSS('box-shadow', 'none');
    await expect(active).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await active.focus();
    expect(await active.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
  }
  await page.getByRole('button', { name: 'Switch color theme' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: `test-results/identity-dark-${testInfo.project.name}.png`, fullPage: false });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await expect(logo.locator('.brand-stroke').first()).toHaveCSS('animation-name', 'brand-stroke-reveal');
  await expect(logo.locator('.brand-stroke').first()).toHaveCSS('animation-iteration-count', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(logo.locator('.brand-stroke').first()).toHaveCSS('animation-name', 'none');
});
