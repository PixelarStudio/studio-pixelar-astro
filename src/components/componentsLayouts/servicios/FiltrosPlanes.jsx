import React, { useEffect, useState } from "react";

const FiltroPlanes = () => {
  useEffect(() => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categorySections = document.querySelectorAll(".category-section");
    const servicesContainer = document.getElementById("services-container");

    const savedFilter = localStorage.getItem("selectedFilter") || "all";
    const initialScroll = parseInt(localStorage.getItem("filterScrollPosition") || "0");

    let scrollPosition = 0;

    const applyFilter = (category, save = true) => {
      scrollPosition = window.scrollY;
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.category === category) btn.classList.add("active");
      });

      servicesContainer.style.opacity = "0";
      servicesContainer.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        if (category === "all") {
          categorySections.forEach((sec) => (sec.style.display = "block"));
        } else {
          categorySections.forEach((sec) => {
            sec.style.display = sec.id === category ? "block" : "none";
          });
        }

        if (save) {
          localStorage.setItem("selectedFilter", category);
          localStorage.setItem("filterScrollPosition", scrollPosition);
        }

        servicesContainer.style.opacity = "1";

        setTimeout(() => {
          window.scrollTo({
            top: category === "all" ? initialScroll : scrollPosition,
            behavior: "auto",
          });
        }, 50);
      }, 300);
    };

    setTimeout(() => {
      applyFilter(savedFilter, false);
    }, 100);

    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const category = button.dataset.category;
        applyFilter(category);
      });
    });

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("filterScrollPosition", window.scrollY);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return null; // Este componente solo ejecuta lógica, no renderiza nada
};

export default FiltroPlanes;
