class User {
  constructor(name, totalMoney, cards = []) {
    this.name = name;
    this.totalMoney = totalMoney;
    this.cards = cards;
    this.blocked = false;
  }

  isEnoughMoney(sum) {
    if (sum <= this.totalMoney) {
      return true;
    }

    return false;
  }

  addMoney(sum) {
    this.totalMoney += sum;
  }

  substractMoney(sum) {
    this.totalMoney -= sum;
  }

  blockUser() {
    this.blocked = true;
  }

  isBlocked() {
    if (this.blocked) {
      return true;
    }

    return false;
  }

  getBankCards() {
    return this.cards;
  }
}

class SendMoney {
  constructor(fromTarget, toTarget, bank) {
    this.fromTarget = fromTarget;
    this.toTarget = toTarget;
    this.bank = bank;
  }

  send(sum) {
    // if () {
    //   return 'Разные банки'
    // }
    if (this.fromTarget.isEnoughMoney(sum)) {
      this.fromTarget.substractMoney(sum);
      this.toTarget.addMoney(sum);

      return `
      ##########################################
      ## Bank: ${this.bank.bankName} ###########
      ##########################################
      ## Отправитель: ${this.fromTarget.name} ##
      ##########################################
      ## Получатель: ${this.toTarget.name} #####
      ##########################################
      ## Сумма: ${sum} ####################
      ##########################################
      ## Дата: ${Date.now()} ###################
      ##########################################
      `;
    }

    return 'Недостаточно средств';
  }
}

class Bank {
  constructor(bankName, comission = 5) {
    this.bankName = bankName;
    this.comission = comission;
  }
}

const user1 = new User('Леша', 1000);
const user2 = new User('Костя', 2000);

const belBank = new Bank('BelBank');
const ruBank = new Bank('RuBank');

const sendCash = new SendMoney(user1, user2, belBank);

sendCash.send(50);

console.log(user1);
console.log(user2);
console.log(sendCash.send(50));

// блокировка юзера, вывод чека операции, класс банка, у юзера несколько карт банков
