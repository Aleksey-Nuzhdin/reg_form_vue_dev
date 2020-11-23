<template>
  <div class="wrap">
    <form class="form" @submit.prevent="regSubmit">
      <div class="first__page page_wrap" >
        <h2 class="form__title">Регестрация</h2>
        <label for="surname">Фамилия*</label>
        <input type="text" id="surname" />

        <label for="name">Имя*</label>
        <input type="text" id="name" />

        <label for="middleName">Отчество</label>
        <input type="text" id="middleName" />

        <label for="DOB">Дата рождения*</label>
        <input type="date" id="DOB" />

        <label for="numberPhone">Номер телефона</label>
        <input type="tel" id="numberPhone" />

        <label for="gender">Пол</label>
        <input type="radio" id="genderM" name="gender" />
        <input type="radio" id="genderF" name="gender" />

        <label for="sms">Не отправлять СМС</label>
        <input type="checkbox" id="sms" name="sms" />
      </div>
      <div class="second_page page_wrap">
        <h2 class="form__title"></h2>
        <div class="group">
          <span class="form__text">Группа клиентов*</span>

          <label for="VIP">VIP</label>
          <input type="checkbox" id="VIP" />

          <label for="hard">Проблемные</label>
          <input type="checkbox" id="hard" />

          <label for="OMC">ОМС</label>
          <input type="checkbox" id="OMC" />
        </div>

        <label for="gr">Группа клиентов*</label>
        <select name="gr" multiple>
          <!-- список с возможностью выбора нескольких значений -->
          <option value="A">VIP</option>
          <option value="B">Проблемные</option>
          <option value="C">ОМС</option>
        </select>

        <label for="doctor">Лечащий врач</label>
        <select name="doctor">
          <option value="A">Иванов</option>
          <option value="B">Захаров</option>
          <option value="C">Чернышева</option>
        </select>

      </div>

      <div class="second_page page_wrap">
        <h3 class="title">Адрес</h3>

        
        <label for="numberPhone">Индекс</label>
        <input type="text" id="numberPhone" />

        
        <label for="numberPhone">Страна</label>
        <input type="text" id="numberPhone" />

        
        <label for="numberPhone">Область</label>
        <input type="text" id="numberPhone" />

        
        <label for="numberPhone">Город*</label>
        <input type="text" id="numberPhone" />

        
        <label for="numberPhone">Улица</label>
        <input type="text" id="numberPhone" />

        
        <label for="numberPhone">Дом</label>
        <input type="text" id="numberPhone" />
      </div>
      <div class="third_page page_wrap">
        <h2 class="form__title">Документ</h2>

        <label for="doctor">Тип документа</label>
        <select name="doctor">
          <option value="Иванов">Паспорт</option>
          <option value="Захаров">Свидетельство о рождении</option>
          <option value="Чернышева">Вод. удостоверение</option>
        </select>

        <label for="numberPhone">Серия</label>
        <input type="text" id="numberPhone" />

        <label for="numberPhone">Номер</label>
        <input type="text" id="numberPhone" />

        <label for="numberPhone">Кем выдан</label>
        <input type="text" id="numberPhone" />

        <label for="numberPhone">Дата выдачи</label>
        <input type="text" id="numberPhone" />

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",

};
</script>

<style scoped lang="scss">
.wrap{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.form{
  display: flex;
  flex-direction: column;
}
.page_wrap{
  display: flex;
  flex-direction: column;
}
</style>
