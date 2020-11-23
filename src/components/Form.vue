<template>
  <div class="wrap">
    <form class="form" novalidate
      @submit.prevent="regSubmit"
    >

      <div class="page_wrap" 
        v-show="step === 1"
      >
        <h2 class="form__title">Регестрация</h2>

        <div class="group__input">
          <label for="surname" class='label'>Фамилия*</label>
          <input type="text" id="surname" />
        </div>

        <div class="group__input">
          <label for="name" class='label'>Имя*</label>
          <input type="text" id="name" />
        </div>

        <div class="group__input">
          <label for="middleName" class='label'>Отчество</label>
          <input type="text" id="middleName" />
        </div>

        <div class="group__input">
          <label for="DOB" class='label'>Дата рождения*</label>
          <input type="date" id="DOB" />
        </div>

        <div class="group__input">
          <label for="numberPhone" class='label'>Номер телефона</label>
          <input type="tel" id="numberPhone" />
        </div>

        <div class="group__input">
          <label for="gender" class='label'>Пол</label>
          <input type="radio" id="genderM" name="gender" />
          <input type="radio" id="genderF" name="gender" />
        </div>

        <div class="group__input">
          <label for="sms" class='label'>Не отправлять СМС</label>
          <input type="checkbox" id="sms" name="sms" />
        </div>
        <button @click="nextStep" calss='btn__step'>Далее</button>
      </div>


      <div class="page_wrap" 
        v-show="step === 2"
      >
        <h2 class="form__title">Даные</h2>
        <div class="group">
          <span class="form__text">Группа клиентов*</span>

          <div class="group__input">
            <label for="VIP" class='label'>VIP</label>
            <input type="checkbox" id="VIP" />
          </div>

          <div class="group__input">
            <label for="hard" class='label'>Проблемные</label>
            <input type="checkbox" id="hard" />
          </div>

          <div class="group__input">
            <label for="OMC" class='label'>ОМС</label>
            <input type="checkbox" id="OMC" />
          </div>
        </div>

        <div class="group__input">
          <label for="gr" class='label'>Группа клиентов*</label>
          <select name="gr" multiple>
            <!-- список с возможностью выбора нескольких значений -->
            <option value="A">VIP</option>
            <option value="B">Проблемные</option>
            <option value="C">ОМС</option>
          </select>
        </div>

        <div class="group__input">
          <label for="doctor" class='label'>Лечащий врач</label>
          <select name="doctor">
            <option value="A">Иванов</option>
            <option value="B">Захаров</option>
            <option value="C">Чернышева</option>
          </select>
        </div>
        <button @click="nextStep" calss='btn__step'>Далее</button>
        <button @click="previousStep" calss='btn__step'>Назад</button>
      </div>


      <div class="page_wrap" 
        v-show="step === 3"
      >
        <h2 class="title">Адрес</h2>

        <div class="group__input">
          <label for="index" class='label'>Индекс</label>
          <input type="text" id="index" />
        </div>

        <div class="group__input">
          <label for="coutry" class='label'>Страна</label>
          <input type="text" id="coutry" />
        </div>

        <div class="group__input">
          <label for="region" class='label'>Область</label>
          <input type="text" id="region" />
        </div>

        <div class="group__input">
          <label for="city" class='label'>Город*</label>
          <input type="text" id="city" />
        </div>

        <div class="group__input">
          <label for="street" class='label'>Улица</label>
          <input type="text" id="street" />
        </div>

        <div class="group__input">
          <label for="home" class='label'>Дом</label>
          <input type="text" id="home" />
        </div>
        <button @click="nextStep" calss='btn__step'>Далее</button>
        <button @click="previousStep" calss='btn__step'>Назад</button>
      </div>


      <div class="page_wrap"
        v-show="step === 4"
      >
        <h2 class="form__title">Документ</h2>

        <div class="group__input">
          <label for="typeDocument" class='label'>Тип документа</label>
          <select name="typeDocument">
            <option value="Иванов">Паспорт</option>
            <option value="Захаров">Свидетельство о рождении</option>
            <option value="Чернышева">Вод. удостоверение</option>
          </select>
        </div>

        <div class="group__input">
          <label for="series" class='label'>Серия</label>
          <input type="text" id="series" />
        </div>

        <div class="group__input">
          <label for="number" class='label'>Номер</label>
          <input type="text" id="number" />
        </div>

        <div class="group__input">
          <label for="issuedBy" class='label'>Кем выдан</label>
          <input type="text" id="issuedBy" />
        </div>

        <div class="group__input">
          <label for="dateIssue" class='label'>Дата выдачи</label>
          <input type="date" id="dateIssue" />
        </div>
        <button @click="previousStep" calss='btn__step'>Назад</button>
        <button @click="create" calss='btn__step'>Создать</button>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    step: 1,
    dataInputRender:[
      [
        {
          title:'Фамилия*',
          id:'surname',
          type:'text'

        },{},{},{},{}
      ],
      {},
      {},
      {}
    ]
  }),
  methods:{
    nextStep(){
      if(this.step + 1 > 4) this.step = 4
      else this.step++
    },  
    previousStep(){
      if( this.step-1 < 1 ) this.step = 1
      else this.step-- 
      
    }
  },
};
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  width: 100%;
  
  display: flex;
  justify-content: center;
}
.form {
  margin-top: 20%;
  height: max-content;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgb(224, 236, 255);
  border-radius: 20px;
  border: 3px solid rgb(93, 123, 255);

}
.group__input{
  display: flex;
  flex-direction: column;
}
.label{
  display: block;
  width: 100px;
}
.page_wrap {
  display: flex;
  flex-direction: column;
}
</style>
