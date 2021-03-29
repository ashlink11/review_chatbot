/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Review {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "REVIEW":
        response = Response.genQuickReply(i18n.__("review.start"), [
          {
            title: i18n.__("review.good_emote"),
            payload: "REVIEW_EMOTE_GOOD"
          },
          {
            title: i18n.__("review.average_emote"),
            payload: "REVIEW_EMOTE_AVERAGE"
          },
          {
            title: i18n.__("review.bad_emote"),
            payload: "REVIEW_EMOTE_BAD"
          }
        ]);
        break;

      case "REVIEW_EMOTE_GOOD":
        response = Response.genQuickReply(i18n.__("review.positive"), [
          {
            title: i18n.__("review.yes"),
            payload: "REVIEW_YES_RATING"
          },
          {
            title: i18n.__("review.no"),
            payload: "REVIEW_NO_RATING"
          }
        ]);

      case "REVIEW_EMOTE_AVERAGE":
        response = Response.genQuickReply(i18n.__("review.neutral"), [
          {
            title: i18n.__("review.yes"),
            payload: "REVIEW_YES_RATING"
          },
          {
            title: i18n.__("review.no"),
            payload: "REVIEW_NO_RATING"
          }
        ]);

      case "REVIEW_EMOTE_BAD":
        response = Response.genQuickReply(i18n.__("review.negative"), [
          {
            title: i18n.__("review.yes"),
            payload: "REVIEW_YES_RATING"
          },
          {
            title: i18n.__("review.no"),
            payload: "REVIEW_NO_RATING"
          }
        ]);
        break;

      case "REVIEW_YES_RATING":
        response = Response.genQuickReply(i18n.__("review.yes_rating"), [
          {
            title: i18n.__("review.one_star"),
            payload: "REVIEW_STAR"
          },
          {
            title: i18n.__("review.two_star"),
            payload: "REVIEW_STAR"
          },
          {
            title: i18n.__("review.three_star"),
            payload: "REVIEW_STAR"
          },
          {
            title: i18n.__("review.four_star"),
            payload: "REVIEW_STAR"
          },
          {
            title: i18n.__("review.five_star"),
            payload: "REVIEW_STAR"
          }
        ]);
        break;

      case "REVIEW_NO_RATING":
        response = Response.genText(i18n.__("review.come_back_later"));
        break;

      case "REVIEW_STAR":
        response = Response.genText(i18n.__("review.thanks_comment"));

        // response = Response.genGenericTemplate(
        //   `${config.appUrl}/order.png`,
        //   i18n.__("review.thanks_title"),
        //   i18n.__("review.thanks_subtitle"),
        //   [
        //     Response.genWebUrlButton(
        //       i18n.__("review.thanks_button"),
        //       `${config.appUrl}`
        //     )
        //   ]
        // );
        break;

        case "REVIEW_THANK_YOU":
          response = Response.genText(i18n.__("review.come_back_later"));
          break;

    }
    return response;
  }

};
