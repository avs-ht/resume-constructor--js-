const {expect} = require('@playwright/test');
const options = {
    month: 'long',
    year: 'numeric',
  };

const getLocalDate = date => new Date(Date.parse(date)).toLocaleDateString('ru-RU', options)

export async function checkGeneratedPage(page, data) {
  const resume = await page.getByTestId('resume-main-content');
  await expect(resume).toBeVisible();

  await expect(page.getByTestId('back-button')).toBeVisible();
  await expect(page.getByTestId('save-button')).toBeVisible();

  await expect(resume.getByText('Личные данные', {exact: true})).toBeVisible();
  await expect(resume.getByText('ФИО', {exact: true})).toBeVisible();
  await expect(resume.getByText(data.fullName, {exact: true})).toBeVisible();

  if (data.birth) {
    const [year, month, day] = data.birth.split('-');
    const birthDate = `${day}.${month}.${year}`
    await expect(resume.getByText('Дата рождения', {exact: true})).toBeVisible();
    await expect(resume.getByText(birthDate, {exact: true})).toBeVisible();
  }

  if (data.city) {
    await expect(resume.getByText('Город', {exact: true})).toBeVisible();
    await expect(resume.getByText(data.city, {exact: true})).toBeVisible();
  }

  if (data.phone) {
    await expect(resume.getByText('Номер телефона', {exact: true})).toBeVisible();
    await expect(resume.getByText(data.phone, {exact: true})).toBeVisible();
  }

  if (data.email) {
    await expect(resume.getByText('Email', {exact: true})).toBeVisible();
    await expect(resume.getByText(data.email, {exact: true})).toBeVisible();  
  }

  if (data.description) {
    await expect(resume.getByText(data.description, {exact: true})).toBeVisible()
  }

  if (data.interest && data.interest.length !== 0){
    await expect(resume.getByText('Интересы', {exact: true})).toBeVisible();
    for (const interest of data.interest) {
      if (!interest) continue
      await expect(resume.getByText(interest, {exact: true})).toBeVisible();
    }
  }

  if (data.language && data.language.length !== 0) {
    await expect(resume.getByText('Языки', {exact: true})).toBeVisible();
    for (const language of data.language) {
        if (!language[0] || !language[1]) continue
        await expect(resume.getByText(language[0], {exact: true})).toBeVisible();
        await expect(resume.getByText(language[1], {exact: true})).toBeVisible();
      }
  }

  if (data.job && data.job.length !== 0) {
    await expect(resume.getByText('Опыт работы', {exact: true})).toBeVisible();
    for (const job of data.job) {
        if (!job[0]) continue
        await expect(resume.getByText(job[0], {exact: true})).toBeVisible();
        
        if (job[1]) {
            let prefix = 'наст. время';
            if (job[2]) {
                prefix = getLocalDate(job[2])
            }
            await expect(resume.getByText(`${getLocalDate(job[1])} — ${prefix}`, {exact: true})).toBeVisible();
        }
        
        if (job[3]) await expect(resume.getByText(job[3], {exact: true})).toBeVisible();
        if (job[4]) await expect(resume.getByText(job[4], {exact: true})).toBeVisible();
      }
  }

  if (data.education && data.education.length !== 0) {
    await expect(resume.getByText('Образование и квалификация', {exact: true})).toBeVisible();
    for (const education of data.education) {
      if (!education[0]) continue
      await expect(resume.getByText(education[0], {exact: true})).toBeVisible();
      if (education[1]) {
        let prefix = 'наст. время';
        if (education[2]) {
            prefix = getLocalDate(education[2])
        }
        await expect(resume.getByText(`${getLocalDate(education[1])} — ${prefix}`, {exact: true})).toBeVisible();
      }
      if (education[3]) await expect(resume.getByText(education[3], {exact: true})).toBeVisible();
      if (education[4]) await expect(resume.getByText(education[4], {exact: true})).toBeVisible();
    }
  }

  if (data.course && data.course.length !== 0) {
    await expect(resume.getByText('Курсы', {exact: true})).toBeVisible();
    for (const course of data.course) {
      if (!course[0]) continue
      await expect(resume.getByText(course[0], {exact: true})).toBeVisible();
      if (course[1]) {
        let prefix = 'наст. время';
        if (course[2]) {
            prefix = getLocalDate(course[2])
        }
        await expect(resume.getByText(`${getLocalDate(course[1])} — ${prefix}`, {exact: true})).toBeVisible();
      }
      if (course[3]) await expect(resume.getByText(course[3], {exact: true})).toBeVisible();
    }
  }
}
