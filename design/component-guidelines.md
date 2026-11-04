# Component Guidelines & UI Patterns

## 1. Action Button: "LIGHT THE CRACKER"

The centerpiece trigger of the celebration stage.
- **Visual Style:** Radiant gradient from Amber-400 to Marigold-500, bordered with antique gold, layered with an inner pulse glow and a flame icon.
- **States:**
  - *Resting:* Golden breathing pulse glow (`animation: pulse 2.5s infinite`).
  - *Hover:* Slight scale up (`scale-105`), heightened elevation glow.
  - *Active / Pressed:* Micro compression (`scale-95`).
  - *Disabled (During Cracker Burst):* Desaturated warm bronze, opacity 60%, cursor `not-allowed`, text dynamically changes to *"BURSTING..."*.
  - *Keyboard Focus:* High-contrast 2px ring offset in amber-300.

---

## 2. Cracker Menu Card

- **Layout:** Vertical card containing cracker vector preview, decorative category badge, cracker name, and brief sensory tagline.
- **States:**
  - *Unselected:* Background `--color-bg-surface`, border `--color-border-subtle`.
  - *Hover:* Background elevates, subtle warm gold border highlight.
  - *Selected:* Border ring `--color-gold-500` with radiating drop shadow, active check badge, vector graphic floats upward slightly.
- **Accessibility:** Keyboard navigable with arrow keys or Tab, `aria-selected="true"`.

---

## 3. Modals & Dialogs (Invite Friends, Full Room)

- **Backdrop:** Frosted glass effect (`backdrop-blur-md bg-black/60`).
- **Container:** Rounded-2xl, deep midnight background, ornate gold trim border.
- **Focus Trap:** Tabbing is constrained within the modal; pressing Escape closes it; focus returns to the triggering element.
- **Share Controls:** One-click copy with immediate visual confirmation ("Copied to Clipboard!").

---

## 4. Participant Tray & Avatars

- Compact avatars with vibrant festive background gradients (amber, crimson, emerald, royal violet, peacock teal).
- Crown icon for Room Host.
- Live connection pulse dot (green = connected).
- Tooltip displaying nickname and role.

