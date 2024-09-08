// did not use the import statement because the import statement will thorw an error because of the common js module syntax
// use nhi kare import statement
document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.querySelector(
    ".edit-button"
  ) as HTMLButtonElement;
  const saveButton = document.querySelector(
    ".save-button"
  ) as HTMLButtonElement;
  const resetButton = document.querySelector(
    ".reset-button"
  ) as HTMLButtonElement;
  const downloadButton = document.querySelector(
    ".download-button"
  ) as HTMLButtonElement;
  const editDirectButton = document.querySelector(
    ".edit-direct-button"
  ) as HTMLButtonElement;
  const editFormButton = document.querySelector(
    ".edit-form-button"
  ) as HTMLButtonElement;
  const editOptions = document.querySelector(".edit-options") as HTMLElement;
  const editForm = document.querySelector(".edit-form") as HTMLElement;
  const container = document.querySelector(".container") as HTMLElement;
  const form = document.getElementById("resume-form") as HTMLFormElement;

  let isEditingDirectly = false;
  let isEditingByForm = false;

  const originalContent = new Map<HTMLElement, string>();
  const hiddenElements = new Map<HTMLElement, string>();

  const initializeOriginalContent = () => {
    document.querySelectorAll(".editable-container").forEach((container) => {
      const fields = (container as HTMLElement).querySelectorAll(
        "[contenteditable]"
      ) as NodeListOf<HTMLElement>;
      fields.forEach((field) => {
        originalContent.set(field, field.innerText);
      });
    });
  };

  const initializeHiddenElements = () => {
    document.querySelectorAll(".editable-container").forEach((container) => {
      const hideButton = container.querySelector(
        ".hide-button"
      ) as HTMLButtonElement;
      if (hideButton) {
        hideButton.addEventListener("click", () => {
          const element = container as HTMLElement;
          hiddenElements.set(element, element.style.display); // Save original display value
          element.style.display = "none";
        });
      }
    });
  };

  const hideHideButtons = () => {
    document.querySelectorAll(".editable-container").forEach((container) => {
      const hideButton = container.querySelector(
        ".hide-button"
      ) as HTMLButtonElement;
      if (hideButton) {
        hideButton.style.display = "none"; // Hide all hide buttons
      }
    });
  };

  initializeOriginalContent();
  initializeHiddenElements();

  // Handle edit button click
  editButton?.addEventListener("click", () => {
    if (editOptions) {
      editOptions.style.display = "block";
    }
  });

  // Handle edit directly button click
  editDirectButton?.addEventListener("click", () => {
    isEditingDirectly = true;
    isEditingByForm = false;
    document.querySelectorAll(".editable-container").forEach((container) => {
      const fields = (container as HTMLElement).querySelectorAll(
        "[contenteditable]"
      ) as NodeListOf<HTMLElement>;
      fields.forEach((field) => {
        field.contentEditable = "true";
      });
    });
    if (editForm) {
      editForm.style.display = "none";
    }
    if (saveButton) {
      saveButton.style.display = "inline-block";
    }
    if (resetButton) {
      resetButton.style.display = "inline-block";
    }
    if (downloadButton) {
      downloadButton.style.display = "none";
    }
    if (editOptions) {
      editOptions.style.display = "none";
    }

    // Update hide button visibility based on editing mode
    document.querySelectorAll(".editable-container").forEach((container) => {
      const hideButton = container.querySelector(
        ".hide-button"
      ) as HTMLButtonElement;
      if (hideButton) {
        hideButton.style.display = "none"; // Hide button by default
        container.addEventListener("mouseover", () => {
          if (isEditingDirectly) {
            hideButton.style.display = "inline-block";
          }
        });
        container.addEventListener("mouseout", () => {
          hideButton.style.display = "none";
        });
      }
    });
  });

  // Handle edit by form button click
  editFormButton?.addEventListener("click", () => {
    isEditingDirectly = false;
    isEditingByForm = true;
    document.querySelectorAll(".editable-container").forEach((container) => {
      const fields = (container as HTMLElement).querySelectorAll(
        "[contenteditable]"
      ) as NodeListOf<HTMLElement>;
      fields.forEach((field) => {
        field.contentEditable = "false";
      });
    });
    if (editForm) {
      editForm.style.display = "block";
    }
    if (editOptions) {
      editOptions.style.display = "none";
    }
  });

  // Handle form submit
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Update resume content based on form data
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const formData = new FormData(form);

    // Extract form values
    const fullName = formData.get("full-name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const description = formData.get("description") as string;

    // Experience Section
    const experienceCompany1 = formData.get("experience-company-1") as string;
    const experienceAddress1 = formData.get("experience-address-1") as string;
    const experienceDuration1 = formData.get("experience-duration-1") as string;
    const experienceRole1 = formData.get("experience-role-1") as string;
    const experienceDesc1 = formData.get("experience-desc-1") as string;

    // Education Section
    const educationInstitution1 = formData.get(
      "education-institution-1"
    ) as string;
    const educationAddress1 = formData.get("education-address-1") as string;
    const educationDuration1 = formData.get("education-duration-1") as string;
    const educationDegree1 = formData.get("education-degree-1") as string;
    const educationDesc1 = formData.get("education-desc-1") as string;

    // Projects Section
    const projectName1 = formData.get("project-name-1") as string;
    const projectDesc1 = formData.get("project-desc-1") as string;

    // Skills Section
    const skillsJs = formData.get("skills-js") as string;
    const skillsCss = formData.get("skills-css") as string;

    // Interests Section
    const interests = formData.get("interests") as string;

    // Certifications Section
    const certifications = formData.get("certifications") as string;

    // Languages Section
    const languages = formData.get("languages") as string;

    // References Section
    const references = formData.get("references") as string;

    const updateTextContent = (selector: string, value: string | null) => {
      const element = document.querySelector(selector) as HTMLElement;
      if (element && value) {
        element.innerText = value;
      }
    };

    // Update text content based on form data ager hai tou
    updateTextContent(".full-name .first-name", fullName.split(" ")[0]);
    updateTextContent(".full-name .last-name", fullName.split(" ")[1]);
    updateTextContent(".email-val", email);
    updateTextContent(".phone-val", phone);
    updateTextContent(".position", position);
    updateTextContent(".desc", description);

    updateTextContent(
      ".section__list-item:nth-child(1) .name",
      experienceCompany1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .addr",
      experienceAddress1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .duration",
      experienceDuration1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .name",
      experienceRole1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .desc",
      experienceDesc1
    );

    updateTextContent(
      ".section__list-item:nth-child(1) .name",
      educationInstitution1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .addr",
      educationAddress1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .duration",
      educationDuration1
    );
    updateTextContent(
      ".section__list-item:nth-child(1) .name",
      educationDegree1
    );
    updateTextContent(".section__list-item:nth-child(1) .desc", educationDesc1);

    updateTextContent(".section__list-item:nth-child(1) .name", projectName1);
    updateTextContent(".section__list-item:nth-child(1) .text", projectDesc1);

    updateTextContent(".skills__item:nth-child(1) .name", skillsJs);
    updateTextContent(".skills__item:nth-child(2) .name", skillsCss);

    updateTextContent(".section__list-item.interests", interests);

    updateTextContent(".section__list-item.certifications", certifications);

    updateTextContent(".section__list-item.languages", languages);

    updateTextContent(".section__list-item.references", references);

    // Show save and reset buttons after form submission
    if (saveButton) {
      saveButton.style.display = "inline-block";
    }
    if (resetButton) {
      resetButton.style.display = "inline-block";
    }

    // Keep the form displayed after form submission to prevent resubmission take dubara na kerna pare
    if (editForm) {
      editForm.style.display = "block";
    }

    hideHideButtons(); // Hide hide buttons after form submission
  });

  // Handle save button click
  saveButton?.addEventListener("click", () => {
    if (isEditingDirectly) {
      // Save changes made directly to content
      document.querySelectorAll(".editable-container").forEach((container) => {
        const fields = (container as HTMLElement).querySelectorAll(
          "[contenteditable]"
        ) as NodeListOf<HTMLElement>;
        fields.forEach((field) => {
          originalContent.set(field, field.innerText);             // Save updated content
        });
      });

      alert("Changes saved!");
      if (saveButton) {
        saveButton.style.display = "none";
      }
      if (resetButton) {
        resetButton.style.display = "none";
      }
      if (downloadButton) {
        downloadButton.style.display = "inline-block";
      }
      if (editForm) {
        editForm.style.display = "none"; // Hide form after saving
      }
    } else if (isEditingByForm) {
      // Save changes made through the form
      alert("Changes saved!");
      if (saveButton) {
        saveButton.style.display = "none";
      }
      if (resetButton) {
        resetButton.style.display = "none";
      }
      if (downloadButton) {
        downloadButton.style.display = "inline-block";
      }
      if (editForm) {
        editForm.style.display = "none"; // Hide form after saving
      }
    }

    hideHideButtons(); // Hide hide buttons after saving
  });

  // Handle reset button click and restore original content
  resetButton?.addEventListener("click", () => {
    document.querySelectorAll(".editable-container").forEach((container) => {
      const fields = (container as HTMLElement).querySelectorAll(
        "[contenteditable]"
      ) as NodeListOf<HTMLElement>;
      fields.forEach((field) => {
        const original = originalContent.get(field);
        if (original !== undefined) {
          field.innerText = original;
        }
        field.contentEditable = "false"; // Set contentEditable to false    
      });
    });

    // Restore hidden sections
    hiddenElements.forEach((displayValue, element) => {
      (element as HTMLElement).style.display = displayValue;
    });
    hiddenElements.clear();

    alert("Changes reset!");

    if (saveButton) {
      saveButton.style.display = "none";
    }
    if (resetButton) {
      resetButton.style.display = "none";
    }
    if (downloadButton) {
      downloadButton.style.display = "none";
    }
    if (editForm) {
      editForm.style.display = "none"; // Hide form after saving
    }

    // Optionally, show the edit button if you want to allow further editing
    if (editButton) {
      editButton.style.display = "inline-block";
    }

    hideHideButtons(); // Hide hide buttons after resetting
  });

  // Handle download button click pdf generate kerne ke liye function
  downloadButton?.addEventListener("click", () => {
    const container = document.querySelector(".container") as HTMLElement; // Use a specific container class

    (window as any)
      .html2canvas(container, { useCORS: true })
      .then((canvas: HTMLCanvasElement) => {
        const { jsPDF } = (window as any).jspdf; // Access jsPDF from the global window object
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("resume.pdf");
      });
  });
});
