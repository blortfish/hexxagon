initChat();
function initChat() {
    if (chatWindow.length) {
        chatWindow.data('chatId', chatId).data('log', {});
        bindChatElements();
        chatPoll();
    }
}

function chatPoll() {
    setTimeout(function () {
        var chId = chatWindow.data('chatId');
        var lastMessage = $('.chat-window__content .chat-window__message:last-child');
        var msgId = lastMessage.data('messageId');
        var msgTime = lastMessage.find('.chat-window__timestamp').data('time');
        ajaxCall("POST", {method: 'getChat', chatId: chId, messageId: msgId, messageTime: msgTime}, function (jsonData) {
            if (jsonData) appendChatElements(jsonData);
            chatPoll();
    });
    }, 900);
}

function bindChatElements() {
    $('#chat-window__input--text').on('keyup', function (event) {
        if (event.keyCode == 13) sendMessage();
    });
    $('.chat-window__submit.button').on('click', sendMessage);
}

function sendMessage() {
    var text = $('#chat-window__input--text');
    var chatId = $('.chat-window__wrapper').data('chatId');
    ajaxCall("POST", {method: 'sendMessage', message: text.val(), chatid: chatId}, function (reply) {
        appendChatElements(reply);
    });
    text.val('').text('');
}

function appendChatElements(jsonData) {
    if (jsonData.length > 0) {

        var chatWindow = $('.chat-window__content');
        var log = $('.chat-window__wrapper').data("log");
        var appended = false;
        for (var i = 0, l = jsonData.length; i < l; i++) {
            if (!log.hasOwnProperty(jsonData[i].messageid)) {
                appended = true;
                log[jsonData[i].messageid] = jsonData[i].message; // http://jsperf.com/array-hasownproperty-vs-array-indexof check for duplicates in chat.... ajax is not so predictable
                chatWindow.append(
                    "<div class='chat-window__message' data-message-id='" + jsonData[i].messageid + "'>" +
                        "<span class='chat-window__timestamp' data-time='" + jsonData[i].timestamp + "." + jsonData[i].micro + "' data-livestamp='" + jsonData[i].timestamp + "'>" + moment(jsonData[i].timestamp).fromNow() + "</span>" +
                        "<span class='chat-window__username'>" + jsonData[i].username + ":</span>" +
                        "<span class='chat-window__message'>" + jsonData[i].message + "</span>" +
                        "</div>");
            }
        }
        setTimeout(function () {
            if(appended)$(chatWindow).scrollTop($(chatWindow).prop('scrollHeight'));
        }, 100); //quirky ajax fix for scroll to bottom see: http://stackoverflow.com/questions/17578901/jquery-scrolltop-not-working
    }
}