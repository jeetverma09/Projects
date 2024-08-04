export const loadMessages = () => ({
    type: 'LOAD_MESSAGES_REQUEST'
})

export const newMessage = (message) => ({
    type: 'NEW_MESSAGE',
    payload: message
})
export const loadMessagesSuccess = (messages) => ({
    type: 'LOAD_MESSAGES_SUCCESS',
    payload: messages
});