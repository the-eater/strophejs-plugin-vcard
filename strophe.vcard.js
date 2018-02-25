import {Strophe, $iq} from 'strophe.js';

const buildIq = function(type, jid, vCardEl) {
    const iq = $iq(jid ? {type: type, to: jid} : {type: type});
    iq.c("vCard", {xmlns: Strophe.NS.VCARD});
    if (vCardEl) {
        iq.cnode(vCardEl);
    }
    return iq;
};

Strophe.addConnectionPlugin('vcard', {
    _connection: null,
    init: function(conn) {
        this._connection = conn;
        return Strophe.addNamespace('VCARD', 'vcard-temp');
    },

    /* Function
     * Retrieve a vCard for a JID/Entity
     * Parameters:
     * (Function) handler_cb - The callback function used to handle the request.
     * (String) jid - optional - The name of the entity to request the vCard
     *     If no jid is given, this function retrieves the current user's vcard.
     * */
    get: function(handler_cb, jid, error_cb) {
        const iq = buildIq("get", jid);
        return this._connection.sendIQ(iq, handler_cb, error_cb);
    },

    /* Function
     *  Set an entity's vCard.
     */
    set: function(handler_cb, vCardEl, jid, error_cb) {
        const iq = buildIq("set", jid, vCardEl);
        return this._connection.sendIQ(iq, handler_cb, error_cb);
    }
});
