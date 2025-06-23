'use strict';

class Project {
  constructor(title, description, imageUrl = "img/project_1.webp", link = "#") {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.link = link;
  }
}

const projects = [
  new Project("Proyecto 1", "Descripción del proyecto 1", "img/project_1.webp"),
  new Project("Proyecto 2", "Descripción del proyecto 2", "img/project_2.webp"),
  new Project("Proyecto 3", "Descripción del proyecto 3", "img/project_3.webp")
];

document.addEventListener("DOMContentLoaded", () => {
  const $id = (id) => document.getElementById(id);
  const sendButton = $id("sendButton");
  const addProjectButton = $id("addProjectBtn");
  const projectsContent = $id("projectsContent");

  if (sendButton) {
    const form = $id("contactForm");
    const formMessage = $id("formMessage");
    const formValue = (formElement) => formElement.value.trim();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{9}$/.test(phone);

    const showMessage = (message, type = "error") => {
      formMessage.textContent = message;
      formMessage.style.color = type === "error" ? "#f87171" : "#34d399";
    }

    const fakeSubmit = () => {
      return new Promise((resolve) => setTimeout(resolve, 1500));
    }
    sendButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const nombre = formValue(form.name);
      const email = formValue(form.email);
      const telefono = formValue(form.phone);
      const mensaje = formValue(form.message);

      if (!nombre || !mensaje) {
        showMessage("Por favor, completa todos los campos.");
        return;
      }
      if (!validateEmail(email)) {
        showMessage("Por favor, ingresa un correo válido.");
        return;
      }
      if (!validatePhone(telefono)) {
        showMessage("Por favor, ingresa un número de celular válido.");
        return;
      }

      try {
        showMessage("Enviando mensaje...", "success");
        await fakeSubmit();
        showMessage("¡Mensaje enviado exitosamente! 🚀", "success");
        form.reset();
      } catch (error) {
        showMessage("Hubo un error al enviar el formulario. Inténtalo más tarde.");
      }
    })
  }

  if (addProjectButton && projectsContent) {
    const projectMessage = $id("projectMessage");
    const addProject = (p) => {
      projectsContent.innerHTML += `
        <figure class="project__card">
          <img src="${p.imageUrl}" alt="${p.title}" class="project__card__image--size">
          <figcaption>
            <h4 class="project__card__title">${p.title}</h4>
            <p class="project__card__desc">${p.description}</p>
            <a href="${p.link}" class="project__card__link">Ver proyecto</a>
          </figcaption>
        </figure>`;
    }

    for (const p of projects) addProject(p);

    addProjectButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const n = projects.length + 1;
      const newProject = new Project(`Proyecto ${n}`, `Descripción del proyecto ${n}`);
      projects.push(newProject);
      addProject(newProject);
      projectMessage.style.display = "block";

      setTimeout(() => {
        projectMessage.style.display = "none";
      }, 1500);
    });
  }
});