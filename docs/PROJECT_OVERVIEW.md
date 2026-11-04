# Project Overview: Digital Diwali

## 1. Executive Summary

**Digital Diwali** is an immersive, accessible, eco-friendly, and interactive web application designed to bring the traditional joy, warmth, and visual spectacle of the Indian Festival of Lights into a shared digital space. Users can celebrate Diwali virtually by bursting authentic digital firecrackers with realistic physics-based particle animations, synchronized spatial sound effects, festive Indian aesthetic styling, and real-time multiplayer lobbies with up to 5 friends.

---

## 2. Problem Statement & Mission

Traditional Diwali celebrations often involve physical fireworks that contribute to air and noise pollution, risk personal injury, and create distress for pets and elderly citizens. Furthermore, diaspora communities, remote friends, and dispersed families frequently celebrate in isolation across different cities and countries.

**Digital Diwali's mission is two-fold:**
1. **Eco-Friendly Festivity:** Deliver the same sensory thrill and festive warmth of bursting crackers without smoke, chemical pollution, or hazard.
2. **Global Real-Time Connection:** Enable friends and families to gather in private, instant virtual celebration rooms and burst crackers together in synchronized harmony.

---

## 3. Core Experience & User Journeys

### User Journey 1: Solo Visitor Experience
1. **Arrival & Welcome Screen:**
   - Visitor lands on the portal and experiences a warm, illuminated welcome screen.
   - Traditional Indian festive motifs (folded Namaste hands, glowing brass diyas, hanging marigold torans, floating fairy lights, dynamic background sparkles).
   - Core messages: *"HAPPY DIWALI"* and *"Let's make this Diwali Digital!"*.
   - Auto-transitions smoothly after 15 seconds or immediately upon clicking *"Skip Intro"*.
   - Reduced motion preferences are automatically respected.
2. **Personal Celebration Portal Initialization:**
   - Client initializes a unique, secure celebration session.
   - The visitor is designated as the Host.
   - Audio context is armed on user gesture.
3. **Exploration & Bursting:**
   - Host browses the Cracker Menu (30% desktop left panel / responsive mobile drawer).
   - Selects from 5 distinct traditional crackers:
     - **Rocket:** Soars skyward with an orange-gold smoke trail and detonates into a multi-tiered willow firework.
     - **Flower Pot (Anar):** Erupts with an ascending golden fountain of high-density sparks.
     - **Chakri (Ground Spinner):** Whirls violently on the ground, spitting centrifugal sparks in changing hues.
     - **Sutli Bomb (Jute Bomb):** Builds intense suspense through a sizzling fuse followed by a dramatic flash and screen-shaking blast.
     - **Phuljhadi (Hand Sparkler):** Dazzles with continuous branching, sizzling golden/silver ember stars.
   - Host clicks **"LIGHT THE CRACKER"**.
   - A ceremonial matchstick appears, strikes flame, and travels smoothly to ignite the cracker's fuse.
   - Sparks sizzle along the fuse, triggering the cracker's full animation sequence and synchronized multi-layer audio.
   - Stage transitions smoothly back to replay-ready state upon completion.

### User Journey 2: Multiplayer Celebration Experience
1. **Host Invites Friends:**
   - Host clicks the **"Invite Friends"** button in the top-right corner of the celebration stage.
   - An elegant festive modal opens, displaying the unique shareable URL (`/celebrate/:sessionId`), participant counter (`1 / 5 Connected`), and a one-click **"Copy Invitation Link"** button with toast feedback and Web Share API fallback.
2. **Friends Join the Room:**
   - Friends open the link.
   - Backend WebSocket server validates the room token and capacity.
   - If capacity is under 5, friend is admitted with an assigned avatar and festive nickname (or customizable name).
   - Room state is synchronized: current cracker selection, active participant list, and room status.
   - If capacity is reached (5 participants), visitor receives a courteous notification: *"This celebration is full! Start your own Digital Diwali celebration."* with a one-click CTA to spin up their own session.
3. **Synchronized Cracker Bursting:**
   - Any member in the room can select a cracker or click **"LIGHT THE CRACKER"**.
   - Server broadcasts the ignition action with a precise server timestamp.
   - All connected peers experience the exact same matchstick travel, fuse burning, cracker detonation, particle spray, and synchronized audio simultaneously.
   - UI locks ignition temporarily across all peers during an active sequence to prevent collision.

---

## 4. Emotional & Aesthetic Goals

- **Festive Authenticity:** Rich cultural motifs, deep jewel tones (royal midnight purple, imperial marigold orange, golden yellow, ruby crimson, warm diya amber), and intricate traditional ornaments.
- **Childlike Delight:** Tactile controls, responsive hover states, smooth micro-interactions, and satisfying sound effects.
- **Inclusivity & Accessibility:** High contrast UI, screen reader descriptions, keyboard operability, and reduced-motion fallbacks.
- **Frictionless Zero-Auth Entry:** No sign-up walls, email verification, or password barriers. Immediate instant-play portal generation.

