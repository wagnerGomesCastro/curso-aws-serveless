const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('./lib/util')
const myRoles = {
    // role name vs function name
    'heroes:list': 'private'
}

const authorizeUser = (userScopes, methodArn) => {
    console.log({ userScopes, methodArn })
    return userScopes.find(
        scope => ~methodArn.indexOf(myRoles[scope])
    )
}

exports.handler = async event => {
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )

        console.log('decodedUser**', decodedUser)
        // return null
         
        const user = decodedUser.user
        const userId = user.username

        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        // dado que irá nas requests
        const authorizerContext = {
            user: JSON.stringify(user)
        }
        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow': 'Deny',
            // 'Allow',
            event.methodArn,
            authorizerContext
        ) 
        return policyDocument
    } catch (error) {
        console.log('auth error**', error.stack)
        // 401 -> token invalido ou expirado
        // 403 -> token sem permissão pra acessar a função!

        return {
            statusCode: 401,
            body: error.stack
        }
    }
}