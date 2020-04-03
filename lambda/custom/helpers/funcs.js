module.exports = {
  /**
   * filter items for a given menu category
   *
   * @param {Object} isSlotValid
   * @param {number} upperLimit
   * @returns {boolean} true/false
   */
isSlotValid(intent, upperLimit) {
  const slotFilled = intent
    && intent.slots
    && intent.slots.specificAnalysis
    && intent.slots.specificAnalysis.value;
  const slotIsInt = slotFilled
    && !Number.isNaN(parseInt(intent.slots.specificAnalysis.value, 10));
  return slotIsInt
    && parseInt(intent.slots.specificAnalysis.value, 10) <= upperLimit
    && parseInt(intent.slots.specificAnalysis.value, 10) > 0;
},
}