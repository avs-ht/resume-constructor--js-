const {test, expect} = require('@playwright/test');
import { checkListItem } from "../utils/check-list-item";
import { createResume } from "../utils/create-resume";
import { deleteListItem } from "../utils/list/deleteItem";
import { toggleCheckbox } from "../utils/list/setCheckbox";
import {openButtonClick} from '../utils/buttonsClick/openButton'
import { actionsButtonClick } from "../utils/buttonsClick/actionsButton";
import { saveButtonClick } from "../utils/buttonsClick/saveButton";

test.beforeEach(async ({page}) => {
    await page.goto('/all');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await createResume(page, '5')
    await createResume(page, '4')
    await createResume(page, '3')
    await createResume(page, '2')
    await createResume(page, '1')
  
    await page.goto('/all');
});
  
test('1. Наличие правильного порядка списков', async ({page}) => {
  await checkListItem(page, '1', 0)
  await checkListItem(page, '2', 1)
  await checkListItem(page, '3', 2)
  await checkListItem(page, '4', 3)
  await checkListItem(page, '5', 4)
});

test('2. Удаление первого резюме', async ({page}) => {
  await deleteListItem(page, 0)
  await checkListItem(page, '2', 0)
  await checkListItem(page, '3', 1)
  await checkListItem(page, '4', 2)
  await checkListItem(page, '5', 3)

  page.goto('/all')

  await checkListItem(page, '2', 0)
  await checkListItem(page, '3', 1)
  await checkListItem(page, '4', 2)
  await checkListItem(page, '5', 3)
});


test('3. Удаление последнего резюме', async ({page}) => {
  await deleteListItem(page, 4)
  await checkListItem(page, '1', 0)
  await checkListItem(page, '2', 1)
  await checkListItem(page, '3', 2)
  await checkListItem(page, '4', 3)

  page.goto('/all')

  await checkListItem(page, '1', 0)
  await checkListItem(page, '2', 1)
  await checkListItem(page, '3', 2)
  await checkListItem(page, '4', 3)
});

test('4. Удаление n-го резюме', async ({page}) => {
  await deleteListItem(page, 1)
  await deleteListItem(page, 2)

  await checkListItem(page, '1', 0)
  await checkListItem(page, '3', 1)
  await checkListItem(page, '5', 2)

  page.goto('/all')

  await checkListItem(page, '1', 0)
  await checkListItem(page, '3', 1)
  await checkListItem(page, '5', 2)
});

test('5. Проверка чекбоксов и кнопки для удаления', async ({page}) => {
  const deleteItemsButton = await page.getByTestId('delete-resumes').nth(0)
  await expect(deleteItemsButton).toBeHidden()

  await toggleCheckbox(page, 0)

  await expect(deleteItemsButton).toBeVisible()

  await toggleCheckbox(page, 1)
  await toggleCheckbox(page, 2)
  await toggleCheckbox(page, 3)
  await toggleCheckbox(page, 4)

  await expect(deleteItemsButton).toBeVisible()
  
  await toggleCheckbox(page, 0, true)
  await toggleCheckbox(page, 1, true)
  await toggleCheckbox(page, 2, true)
  await toggleCheckbox(page, 3, true)
  await toggleCheckbox(page, 4, true)
  
  await expect(deleteItemsButton).toBeHidden()

  await toggleCheckbox(page, 0)
  await toggleCheckbox(page, 1)

  await deleteItemsButton.click()

  await expect(deleteItemsButton).toBeHidden()

  await checkListItem(page, '3', 0)
  await checkListItem(page, '4', 1)
  await checkListItem(page, '5', 2)

  page.goto('/all')

  await checkListItem(page, '3', 0)
  await checkListItem(page, '4', 1)
  await checkListItem(page, '5', 2)

  await expect(deleteItemsButton).toBeHidden()
});

test('6. Выбор нескольких, удаление одного выбранного, удаление выделенных', async ({page}) => {
  const deleteItemsButton = await page.getByTestId('delete-resumes').nth(0)
  await expect(deleteItemsButton).toBeHidden()

  await toggleCheckbox(page, 1)
  await toggleCheckbox(page, 2)
  await toggleCheckbox(page, 3)

  await expect(deleteItemsButton).toBeVisible()
  
  await deleteListItem(page, 2)

  await expect(page.getByTestId('resume-checkbox').nth(1)).toBeChecked()
  await expect(page.getByTestId('resume-checkbox').nth(2)).toBeChecked()

  await expect(deleteItemsButton).toBeVisible()

  await deleteItemsButton.click()

  await checkListItem(page, '1', 0)
  await checkListItem(page, '5', 1)

  await expect(deleteItemsButton).toBeHidden()

  
  page.goto('/all')

  await checkListItem(page, '1', 0)
  await checkListItem(page, '5', 1)

  await expect(deleteItemsButton).toBeHidden()
});

test('7. Проверка правильности оставшихся данных', async ({page}) => {
  await toggleCheckbox(page, 0)
  await toggleCheckbox(page, 1)
  await toggleCheckbox(page, 2)
  await toggleCheckbox(page, 3)

  const deleteItemsButton = await page.getByTestId('delete-resumes').nth(0)
  await deleteItemsButton.click()

  await checkListItem(page, '5', 0)

  page.goto('/all')

  await checkListItem(page, '5', 0)

  actionsButtonClick(page, 0)
  openButtonClick(page, 0)

  await expect(page.getByText('5', {exact: true}).first()).toBeVisible()
  await expect(page.getByText('5', {exact: true}).last()).toBeVisible()

  await saveButtonClick(page)

  await checkListItem(page, '5', 0)
});