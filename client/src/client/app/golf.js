import {drawBackground, drawWalls, openingSort, drawBall, drawArrow, drawHole, throttle} from "./renderingFunctions"
/* eslint-disable */
function golf() {
  'use strict';

  var socket = io.connect();

  swip.init({ socket: socket, container: document.getElementById('root') }, function (client) {
    var converter = client.converter;
    var stage = client.stage;
    var ctx = stage.getContext('2d');

    var state = null;
    var dragPosition = null;
    var dragging = false;

    client.onClick(function (evt) {
      var hole = { x: evt.position.x, y: evt.position.y };
      client.emit('setHole', hole);
    });

    client.onDragStart(function (evt) {
      if (state) {
        var distanceX = evt.position[0].x - state.cluster.data.ball.x;
        var distanceY = evt.position[0].y - state.cluster.data.ball.y;
        var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

        if (distance < (2 * state.cluster.data.ball.radius)) {
          dragging = true;
          dragPosition = evt.position[0];
        }
      }
    });

    client.onDragMove(function (evt) {
      var distanceX = evt.position[0].x - state.cluster.data.ball.x;
      var distanceY = evt.position[0].y - state.cluster.data.ball.y;
      var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

      if (dragging) {
        if (distance > 150) {
          dragPosition = {
            x: state.cluster.data.ball.x + (distanceX / distance) * 150,
            y: state.cluster.data.ball.y + (distanceY / distance) * 150
          }
        } else {
          dragPosition = evt.position[0];
        }
      }
    });

    client.onDragEnd(function (evt) {
      if (dragging) {
        dragging = false;
        client.emit('hitBall', {
          speedX: (evt.position[0].x - state.cluster.data.ball.x) / 2,
          speedY: (evt.position[0].y - state.cluster.data.ball.y) / 2
        });
      }
    });

    swip.sensor.onChangeOrientation(throttle(function (evt) {
      client.emit('updateOrientation', {
        rotationX: evt.rotation.x,
        rotationY: evt.rotation.y
      });
    }, 200));


    client.onUpdate(function (evt) {
      state = evt;
      var client = state.client;
      var ball = state.cluster.data.ball;
      var hole = state.cluster.data.hole;

      ctx.save();

      applyTransform(ctx, converter, client.transform);
      drawBackground(ctx, client);
      drawHole(ctx, hole);

      if (dragging) {
        drawArrow(ctx, ball, dragPosition);
      }

      drawBall(ctx, ball);
      drawWalls(ctx, client);

      ctx.restore();
    });
  });

  function applyTransform (ctx, converter, transform) {
    ctx.translate(-converter.toDevicePixel(transform.x), -converter.toDevicePixel(transform.y));
    ctx.scale(converter.toDevicePixel(1), converter.toDevicePixel(1));

  }

};

export default golf;

console.log("Example")