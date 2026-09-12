# DOM64 (`dom64`)

<div align="center">

**Ультрашвидка бібліотека вибірок та маніпуляцій з DOM для TECHNO4 FRAMEWORK2**  
*Ultra-fast DOM manipulation and selector library for TECHNO4 FRAMEWORK2*

[![License: LGPL-3.0-or-later](https://img.shields.io/badge/License-LGPL--3.0--or--later-blue.svg)](LICENSE)
[![Organization](https://img.shields.io/badge/Organization-CO%20%C2%ABCF%20TECHNO4%C2%BB-green.svg)](https://techno4.online)

---

### [uk_UA](#uk_ua) &nbsp;|&nbsp; [en_GB](#en_gb)

---

</div>

<br>

---

## uk_UA

### 🎯 Мета проєкту
> **Вільна ініціатива розвитку сучасних інструментів розробника за підтримки благодійної організації «БЛАГОДІЙНИЙ ФОНД ТЕХНО4» (CO «CF TECHNO4»).**

`dom64` — це легковісна, швидка та незалежна бібліотека для маніпуляції об'єктною моделлю документа (DOM). Вона забезпечує знайомий jQuery/Dom7-подібний ланцюжковий API для роботи з елементами, подіями, класами, анімаціями та формами з мінімальним розміром бандла та повною підтримкою SSR (Server-Side Rendering).

Використовується як базовий селекторний рушій у складі UI-ядра **`techno4`** (`import $ from 'dom64'`).

### 📦 Встановлення

```bash
npm install dom64
```

### 🚀 Використання

```javascript
import $ from 'dom64';

// Пошук та маніпуляція DOM-елементами
$('.button').addClass('active');

// Обробка подій
$('#my-button').on('click', function (e) {
  console.log('Клік виконано!', this);
});

// Анімації та переходи
$('.box').transform('translate3d(0, 100px, 0)').transition(300);
```

### 🛠 Збірка з вихідного коду

```bash
# Встановлення залежностей
npm install

# Збірка для розробки
npm run build:dev

# Продакшн-збірка
npm run build:prod
```

### 📚 Офіційна документація
👉 **[https://techno4.online/надбання/фреймворк](https://techno4.online/%D0%BD%D0%B0%D0%B4%D0%B1%D0%B0%D0%BD%D0%BD%D1%8F/%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)**

### ⚖️ Ліцензія та права
Вихідний код розповсюджується за ліцензією **LGPL-3.0-or-later**.  
Підтримується: **благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»** (`CO «CF TECHNO4»`).  
Автор: **Mykola Zghurskyi** (`mykola@techno4.online`).  
Містить адаптовані компоненти Dom7 (MIT License).

<br>

---

## en_GB

### 🎯 Project Mission
> **A free initiative fostering modern developer tools, supported by the charitable organization "CO «CF TECHNO4»" (благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»).**

`dom64` is an ultra-fast, lightweight, and zero-overhead DOM manipulation library. It provides a chainable, jQuery/Dom7-like syntax for working with DOM elements, event listeners, classes, animations, and forms with minimal bundle footprint and full SSR (Server-Side Rendering) compatibility.

Serves as the foundational selector engine for **`techno4`** core (`import $ from 'dom64'`).

### 📦 Installation

```bash
npm install dom64
```

### 🚀 Usage

```javascript
import $ from 'dom64';

// Element manipulation
$('.button').addClass('active');

// Event handling
$('#my-button').on('click', function (e) {
  console.log('Clicked!', this);
});

// Animations and transitions
$('.box').transform('translate3d(0, 100px, 0)').transition(300);
```

### 🛠 Building from Source

```bash
# Install dependencies
npm install

# Development build
npm run build:dev

# Production build
npm run build:prod
```

### 📚 Official Documentation
👉 **[https://techno4.online/надбання/фреймворк](https://techno4.online/%D0%BD%D0%B0%D0%B4%D0%B1%D0%B0%D0%BD%D0%BD%D1%8F/%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)**

### ⚖️ License & Attribution
Distributed under the **LGPL-3.0-or-later** license.  
Published and supported by **CO «CF TECHNO4»** (`благодійна організація «БЛАГОДІЙНИЙ ФОНД ТЕХНО4»`).  
Author: **Mykola Zghurskyi** (`mykola@techno4.online`).  
Contains derivatives of Dom7 (MIT License).