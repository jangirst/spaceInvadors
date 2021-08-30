export function detectCollision(ball, gameObject) {

  // Collision with the paddle
  let topOfBall = ball.position.y;
  let leftSideOfBall = ball.position.x;
  let rightSideOfBall = ball.position.x + ball.size;
  let bottomOfBall = ball.position.y + ball.size;

  let topOfObjekt = gameObject.position.y;
  let leftSideOfObjekt = gameObject.position.x;
  let rightSideOfObjekt = gameObject.position.x + gameObject.width;
  let bottomOfObjekt = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfObjekt &&
    topOfBall <= bottomOfObjekt &&
    leftSideOfBall >= leftSideOfObjekt &&
    rightSideOfBall <= rightSideOfObjekt
  ) {
    return true;
  } else {
    return false;
  }
  
}
