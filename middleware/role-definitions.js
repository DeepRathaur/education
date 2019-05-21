let roles = {
    manager: {
        can: ['publish'],
        inherits: ['writer']
    },
    writer: {
        can: ['write', {
            name: 'edit',
            when: function (params) {
                return params.user.id === params.post.owner;
            }
        }],
        inherits: ['guest']
    },
    guest: {
        can: ['read']
    }
}