class Poohjs {
  constructor(data = {}) {
    this.defaults = {
      honeypotSelector: '.ResultsFormFeature .floatField.hp',
      formSelector: '.ResultsFormFeature .simple_form',
      additionalDataSelector: '.ResultsFormFeature .simple_form #lead_additional_data'
    };

    this.settings = {
      ...this.defaults,
      ...data
    };

    this.fields = [...document.querySelectorAll(`${this.settings.honeypotSelector} input`)];
    this.form = document.querySelector(this.settings.formSelector);
    this.additionalDataField = document.querySelector(this.settings.additionalDataSelector);
  }

  init() {
    if (!this.form) {
      return;
    }

    this.form.addEventListener('submit', this.spamCheck.bind(this));
  }

  async spamCheck(e) {
    let isSpam = false;
    e.preventDefault();

    for (let field of this.fields) {
      if (field.value !== '') {
        isSpam = true;
      }
    }

    if (isSpam) {
      await this.addExtraData();
    }
    this.form.submit();
  }

  async addExtraData() {
    const response = await this.getClientIP();
    const data = await response.json();
    this.additionalDataField.value = `${window.navigator.userAgent}:::${data.ip}`;
  }

  getClientIP() {
    return fetch('https://api.ipify.org?format=json');
  }
}

export default Poohjs;
