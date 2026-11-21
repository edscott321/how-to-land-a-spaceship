# How to Land a Spaceship

A free physics escape room for grades 4 to 12. The StS Sentinel is on its way home when a meteorite hits it. Gravity, the engine, the fuel and the main computer are down. Your students are the crew: they fix the ship one system at a time with real physics, then pick the angle that brings it through the atmosphere without burning up or bouncing back into space.

I built it in the first week of the 2024 Stanford Spokes ride and ran it as my workshop at almost every stop from San Francisco to Washington, D.C. This kit writes every station down so you can run it in your own classroom.

**Run it from the web:** https://ethandavidmagalei.com/escape-room/

## For teachers

**Download the kit:** the green Code button above, then Download ZIP, or the latest [release](../../releases). Unzip it and open:

- `guide/index.html`: the teacher guide. The story, the Admiral's briefing, all nine stations with answers and hints, three ways to run it, three levels, and the debrief. Also as `kit/guide.pdf`.
- `ship/index.html`: the ship computer. Put it on the projector. It works offline, straight from the folder, and sends nothing anywhere.
- `kit/printables.pdf`: everything to print (22 pages, US Letter, black and white). For Cadet or Commander level, add `kit/cards-cadet.pdf` or `kit/cards-commander.pdf`.

**Three ways to run it**

1. **The full room:** one crew of 6 to 15, stations around the room, real pulleys, gears and water, and locks if you have them.
2. **The table kit:** a whole class in 4 to 6 crews at once, each with a box of the same puzzles. The ship computer gives every crew its own lane, so you buy no locks.
3. **Paper only:** no materials, for a substitute day or a school with no budget.

**Three levels:** Cadet (grades 4 to 6: observe, measure and count), Officer (grades 6 to 9: ratios and simple formulas), Commander (high school physics: work, torque, Boyle's law, Ohm's law, momentum and the sine of the entry angle).

**The nine stations:** Artificial gravity (Newton's first law), Engine lift (pulleys), Engine gears (gear ratios and torque), Fuel tank (volume and units, or Boyle's law), Fuel balance (balance and torque), Navigation wiring (circuits), Thrusters (Newton's second and third laws), Main computer (a coded message), Re-entry angle (the entry corridor).

Ran it with your class? Tell me how it went: https://ethandavidmagalei.com/contact/

## For anyone changing it

- `ship/ship.js` holds every code, question and hint (`MISSION` for Officer, `LEVEL_STATIONS` for Cadet and Commander). The guide and the crew cards print the same words, so change all three together.
- `print/*.html` are the sources of the PDFs in `kit/`. Open one in Chrome and print it at 100%, or print to PDF.
- The ship computer is plain HTML and JavaScript with no build step and nothing loaded from other sites.

## License

The guide, cards and printables (`guide/`, `print/`, `kit/`) are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): use them, copy them, change them and share them, with credit to Ethan David Magalei. The ship computer's code (`ship/`) is under the MIT license. See `LICENSE.md`.
