const rooms = document.querySelectorAll("[data-lab-room]");

rooms.forEach((room) => {
  const stage = room.querySelector("[data-room-stage]");
  const buttons = room.querySelectorAll("[data-room-target]");
  const wallPanels = room.querySelectorAll("[data-room-focus]");

  if (!stage) return;

  const state = {
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotateX: -4,
    rotateY: -8,
    zoom: 0,
    targetX: -4,
    targetY: -8,
    targetZoom: 0,
    activeTarget: "monitoring",
    lastInteractionAt: Date.now(),
    lastFrameAt: performance.now(),
  };

  const targets = {
    monitoring: { rotateX: -5, rotateY: 0, zoom: 52 },
    siteview: { rotateX: -5, rotateY: -90, zoom: 32 },
    change: { rotateX: -5, rotateY: 90, zoom: 32 },
    contact: { rotateX: -3, rotateY: 180, zoom: 18 },
    reset: { rotateX: -4, rotateY: -8, zoom: 0 },
  };

  function applyTransform() {
    stage.style.setProperty("--room-x", `${state.rotateX}deg`);
    stage.style.setProperty("--room-y", `${state.rotateY}deg`);
    stage.style.setProperty("--room-z", `${state.zoom}px`);
  }

  function markInteraction() {
    state.lastInteractionAt = Date.now();
  }

  function syncActiveWall() {
    stage.dataset.activeWall = state.activeTarget;
    wallPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.roomFocus === state.activeTarget);
    });
    buttons.forEach((button) => {
      const target = button.dataset.roomTarget;
      const isActive = target === state.activeTarget || (target === "reset" && state.activeTarget === "monitoring");
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setTarget(name) {
    const target = targets[name];
    if (!target) return;
    state.targetX = target.rotateX;
    state.targetY = target.rotateY;
    state.targetZoom = target.zoom;
    if (name !== "reset") {
      state.activeTarget = name;
    }
    markInteraction();
    syncActiveWall();
    applyTransform();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setTarget(button.dataset.roomTarget));
  });

  wallPanels.forEach((panel) => {
    panel.addEventListener("click", (event) => {
      if (event.target.closest(".wall-cta")) return;
      event.preventDefault();
      setTarget(panel.dataset.roomFocus);
    });
    panel.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setTarget(panel.dataset.roomFocus);
      }
    });
  });

  room.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a, button")) return;
    state.dragging = true;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    markInteraction();
    room.setPointerCapture(event.pointerId);
  });

  room.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    const deltaX = event.clientX - state.lastX;
    const deltaY = event.clientY - state.lastY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    state.targetY += deltaX * 0.18;
    state.targetX = Math.max(-24, Math.min(14, state.targetX - deltaY * 0.12));
    markInteraction();
  });

  room.addEventListener("pointerup", (event) => {
    state.dragging = false;
    markInteraction();
    if (room.hasPointerCapture(event.pointerId)) {
      room.releasePointerCapture(event.pointerId);
    }
  });

  room.addEventListener("pointercancel", () => {
    state.dragging = false;
    markInteraction();
  });

  room.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      state.targetZoom = Math.max(-70, Math.min(80, state.targetZoom - event.deltaY * 0.08));
      markInteraction();
    },
    { passive: false },
  );

  room.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") state.targetY -= 18;
    if (event.key === "ArrowRight") state.targetY += 18;
    if (event.key === "ArrowUp") state.targetX = Math.max(-24, state.targetX - 6);
    if (event.key === "ArrowDown") state.targetX = Math.min(14, state.targetX + 6);
    if (event.key === "+" || event.key === "=") state.targetZoom = Math.min(80, state.targetZoom + 14);
    if (event.key === "-") state.targetZoom = Math.max(-70, state.targetZoom - 14);
    markInteraction();
  });

  function animate(now) {
    const delta = Math.min(32, now - state.lastFrameAt);
    state.lastFrameAt = now;
    const idleFor = Date.now() - state.lastInteractionAt;
    if (!state.dragging && idleFor > 2400) {
      state.targetY += delta * 0.012;
    }

    state.rotateX += (state.targetX - state.rotateX) * 0.12;
    state.rotateY += (state.targetY - state.rotateY) * 0.12;
    state.zoom += (state.targetZoom - state.zoom) * 0.1;
    applyTransform();
    requestAnimationFrame(animate);
  }

  syncActiveWall();
  applyTransform();
  requestAnimationFrame(animate);
});
