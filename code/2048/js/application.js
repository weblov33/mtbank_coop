// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  game_manager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);

  var backButton = document.getElementById("backButton");
  if (backButton) {
    backButton.addEventListener("click", function () {
      window.parent.postMessage({ type: "mtbank:close-game" }, "*");
    });
  }
});

function handle_undo() {
  game_manager.move(-1);
}
