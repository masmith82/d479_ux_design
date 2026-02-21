const setupCarousels = () => {
  document.querySelectorAll(".carousel-wrap").forEach((wrap) => {
    const carousel = wrap.querySelector(".carousel");
    const left = wrap.querySelector(".scroll-btn.left");
    const right = wrap.querySelector(".scroll-btn.right");

    if (!carousel) return;

    const scrollByAmount = () => Math.round(carousel.clientWidth * 0.8);

    left?.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
    });

    right?.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
    });
  });
};

const setupFilters = () => {
  const form = document.querySelector("[data-filter-form]");
  const cards = Array.from(document.querySelectorAll("[data-hotel-card]"));

  if (!form || cards.length === 0) return;

  const getSelectedAmenities = () =>
    Array.from(form.querySelectorAll("input[name=amenities]:checked")).map(
      (el) => el.value
    );

  const applyFilters = () => {
    const location = form.location.value;
    const price = form.price.value;
    const transport = form.transport.value;
    const availability = form.availability.value;
    const amenities = getSelectedAmenities();

    cards.forEach((card) => {
      const cardLocation = card.dataset.location;
      const cardPrice = card.dataset.price;
      const cardTransport = card.dataset.transport;
      const cardAvailability = card.dataset.availability;
      const cardAmenities = card.dataset.amenities.split(",");

      const matchesLocation = location === "all" || cardLocation === location;
      const matchesPrice = price === "all" || cardPrice === price;
      const matchesTransport =
        transport === "all" || cardTransport.includes(transport);
      const matchesAvailability =
        availability === "all" || cardAvailability === availability;
      const matchesAmenities = amenities.every((item) =>
        cardAmenities.includes(item)
      );

      const visible =
        matchesLocation &&
        matchesPrice &&
        matchesTransport &&
        matchesAvailability &&
        matchesAmenities;

      card.style.display = visible ? "block" : "none";
    });
  };

  form.addEventListener("change", applyFilters);

  form.querySelector("[data-apply]")?.addEventListener("click", (event) => {
    event.preventDefault();
    applyFilters();
  });

  form.querySelector("[data-reset]")?.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    applyFilters();
  });

  applyFilters();
};

setupCarousels();
setupFilters();
