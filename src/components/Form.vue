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
          <label for="gender" class='label'>Пол</label>
          <input type="radio" id="genderM" />
          <input type="radio" id="genderF" />
        </div>

        <div class="btn__wrap">
          <button @click.prevent="nextStep" class='btn__step'>Далее</button>
        </div>
      </div>


      <div class="page_wrap" 
        v-show="step === 2"
      >
        <h2 class="form__title">Даные</h2>
        <div class="group">
          <label class="form__text">Группа клиентов*</label>

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
    
        <div class="group__input">
          <label for="numberPhone" class='label'>Номер телефона</label>
          <input type="tel" id="numberPhone" />
        </div>
        
        <div class="group__input">
          <label for="sms" class='label'>Не отправлять СМС</label>
          <input type="checkbox" id="sms" name="sms" />
        </div>

        <div class="btn__wrap">
          <button @click.prevent="previousStep" class='btn__step'>Назад</button>
          <button @click.prevent="nextStep" class='btn__step'>Далее</button>
        </div>
      </div>


      <div class="page_wrap" 
        v-show="step === 3"
      >
        <h2 class="form__title">Адрес</h2>

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

        <div class="group_home_index">
          <div class="group__input">
            <label for="home" class='label'>Дом</label>
            <input type="number" id="home" />
          </div>

          <div class="group__input">
            <label for="index" class='label'>Индекс</label>
            <input type="number" id="index" />
          </div>
        </div>
        <div class="btn__wrap">
          <button @click.prevent="previousStep" class='btn__step'>Назад</button>
          <button @click.prevent="nextStep" class='btn__step'>Далее</button>
        </div>
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
        <div class="btn__wrap">
          <button @click.prevent="previousStep" class='btn__step'>Назад</button>
          <button type="submit" class='btn__step'>Создать</button>
        </div>
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
          input:[
            'text'
          ]
        },{
          title:'Имя*',
          id:'name',
          input:[
            'text'
          ]
        },{
          title:'Отчество',
          id:'middleName',
          input:[
            'text'
          ]
        },{
          title:'Дата рождения*',
          id:'DOB',
          input:[
            'date'
          ]
        },{
          title:'Номер телефона',
          id:'numberPhone',
          input:[
            'tel'
          ]
        },{
          title:'Пол',
          id:'gender',
          input:[
            'radio','radio'
          ]
        },{
          title:'Не отправлять СМС',
          id:'sms',
          input:[
            'checkbox'
          ]
        },
      ],
      {},
      {},
      {}
    ]
  }),
  methods:{
    nextStep(){
      if(this.step+1 < 5) this.step++
     
    },  
    previousStep(){
      if( this.step-1 < 1 ) this.step = 1
      else this.step-- 
      
    },
    create(){
      console.log('успех');
    },
    regSubmit(){
      console.log('submit');
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
  position: relative;
  margin-top: 20%;
  height: max-content;
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 15px;
  box-shadow: 0 0 500px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
  
  &::after{
    display: block;
    content: "";
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
    z-index: -1;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.10);
}}
.page_wrap {
  display: flex;
  flex-direction: column;
}
.form__title{
  width: 100%;
  line-height: 55px;
  font-size: 27px;
  font-family: 'Arial';
  font-weight: bold;
  color: #3c3c3c;
  background-color: rgba(0, 0, 0, 0.07);
  text-align: center;
  border-bottom: 3px solid rgba(109, 109, 109, 0.15);
  border-radius: 13px 13px 0 0;
}
.group__input{
  display: flex;
  flex-direction: column;
  
  padding: 0 15px 0 15px;
  margin-top: 20px;

  & input{
    margin-top: 5px;
    padding-left: 7px;
    border: 1px solid rgb(187, 182, 182);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
    height: 30px;
    font-size: 20px;
    color: #3c3c3c;
  }
}
.group_home_index{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.label{
  display: block;
  width: 100%;
  font-family: "Arial";
  font-weight: bold;
  font-size: 16px;
  color: #3c3c3c;
}
#home{
  width: 110px;
}
#index{
  width: 110px;
}
.btn__wrap{
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  border-top: 1px solid rgba(109, 109, 109, 0.329);
}
.btn__step{
  flex-grow:1;
  background-color: rgb(224, 224, 224);
  text-shadow: 0 1px #e3f1f1;
  font-size: 18px;
  font-weight: normal;
  color:#3c3c3c;
  border-left: 1px solid;

  &:first-child{
    border-bottom-left-radius: 13px;
    border-left: none;
  }

  &:last-child{
    border-bottom-right-radius: 13px; 
    
    border-color: #9eb9c2;
  }
}
</style>
