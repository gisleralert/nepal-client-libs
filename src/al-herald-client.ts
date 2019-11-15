/**
 * Herald API client
 */
import { AlApiClient, AlDefaultClient } from '@al/client';
import {
    ALHeraldAccountSubscription,
    AlHeraldIntegration,
    AlHeraldIntegrationPayload,
    AlHeraldIntegrationTypes,
    AlHeraldNotification,
    AlHeraldNotificationIncident,
    AlHeraldNotificationList,
    AlHeraldNotificationPayload,
    AlHeraldNotificationQuery,
    AlHeraldSubscriptionKey,
    ALHeraldSubscriptionsKeyByAccountRecord,
} from './types';

export class AlHeraldClientInstance {

    private client:AlApiClient;
    private serviceName = 'herald';
    private serviceVersion = 'v1';

    constructor(client:AlApiClient = null ) {
        this.client = client || AlDefaultClient;
    }

    /**
     * Get all subscriptions keys
     * GET
     * /herald/v1/subscription_keys
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/subscription_keys"
     *
     *  @returns a promise with the subscription keys
     *  @remarks
     *  https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscription_Keys-GetSubscriptionKey
     */
    async getAllSubscriptionKeys(): Promise<AlHeraldSubscriptionKey[]> {
        const subscriptionKeys = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: '/subscription_keys'
        });
        return subscriptionKeys as AlHeraldSubscriptionKey[];
    }

    /**
     * Get all account subscriptions by feature
     * GET
     * /herald/v1/:account_id/subscriptions/:feature
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/subscriptions/incidents"
     *
     * @param accountId AIMS Account ID
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents.
     * @returns a promise with the subscriptions
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscriptions-GetAccountSubscriptionsByFeature
     */
    async getAllAccountSubscriptionByFeature( accountId: string, feature: string): Promise<ALHeraldAccountSubscription[]> {
        const subscriptions = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/subscriptions/${feature}`,
        });
        return subscriptions.subscriptions as ALHeraldAccountSubscription[];
    }

    /**
     * Get all integration subscriptions by feature
     * GET
     * /herald/v1/integrations/:integration_id/subscriptions/:feature
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE/subscriptions/incidents"
     *
     * @param integrationId Corresponding integration identifier.
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents.
     * @returns a promise with the subscriptions
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscriptions-GetIntegrationSubscriptionsAllAccountsInFeature
     */
    async getAllIntegrationSubscriptionsByFeature( integrationId :string, feature: string): Promise<ALHeraldSubscriptionsKeyByAccountRecord[]> {
        const integrations = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `/integrations/${integrationId}/subscriptions/${feature}`,
        });
        return integrations.accounts as ALHeraldSubscriptionsKeyByAccountRecord[];
    }

    /**
     * Get all user subscriptions
     * GET
     * /herald/v1/users/:user_id/subscriptions
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/users/715A4EC0-9833-4D6E-9C03-A537E3F98D23/subscriptions"
     *
     * @param userId
     * @returns a promise with the subscriptions
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscriptions-GetUserSubscriptionsAllAccounts
     */
    async getAllUserSubscriptions( userId: string ): Promise<ALHeraldAccountSubscription[]> {
        const subscriptions = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `/users/${userId}/subscriptions`,
        });
        return subscriptions.accounts as ALHeraldAccountSubscription[];
    }

    /**
     * Get all user subscriptions by feature
     * GET
     * /herald/v1/users/:user_id/subscriptions/:feature
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/users/715A4EC0-9833-4D6E-9C03-A537E3F98D23/subscriptions/incidents"
     *
     * @param userId
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents.
     * @returns a promise with the subscriptions
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscriptions-GetUserSubscriptionsAllAccountsInFeature
     */
    async getAllUserSubscriptionsByFeature( userId: string, feature: string ): Promise<ALHeraldAccountSubscription[]> {
        const subscriptions = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `/users/${userId}/subscriptions/${feature}`,
        });
        return subscriptions.accounts as ALHeraldAccountSubscription[];
    }

    /**
     * Get integration subscriptions
     * GET
     * /herald/v1/:account_id/integrations/:integration_id/subscriptions
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE/subscriptions"
     *
     * @param accountId AIMS Account ID
     * @param integrationId Corresponding integration identifier.
     * @return a promise with the subscriptions
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Subscriptions-GetIntegrationSubscriptionsInAccount
     */
    async getIntegrationSubscriptions( accountId: string, integrationId: string ): Promise<ALHeraldSubscriptionsKeyByAccountRecord> {
        const subscriptions = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${integrationId}/subscriptions`,
        });
        return subscriptions as ALHeraldSubscriptionsKeyByAccountRecord;
    }

    /**
     * Get integration subscriptions by feature
     * GET
     * /herald/v1/:account_id/integrations/:integration_id/subscriptions/:feature
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE/subscriptions/incidents"
     *
     * @param accountId AIMS Account ID
     * @param integrationId Corresponding integration identifier.
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents
     * @return a promise with the subscriptions
     */
    async getIntegrationSubscriptionsByFeature( accountId: string, integrationId: string, feature: string ): Promise<ALHeraldSubscriptionsKeyByAccountRecord> {
        const subscriptions = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${integrationId}/subscriptions/${feature}`,
        });
        return subscriptions as ALHeraldSubscriptionsKeyByAccountRecord;
    }

    /**** Integrations ***/
    /**
     * Create integration for one specific account
     * POST
     * /herald/v1/:account_id/integrations/:type
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/webhook"
     *
     * @param accountId AIMS Account ID
     * @param type integration type, example webhooks.
     * @param payload
     * @returns promise with an integration structure
     *
     * @remarks https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-CreateAccountIntegration
     */
    async createIntegration( accountId: string, type: string, payload: AlHeraldIntegrationPayload): Promise<AlHeraldIntegration> {
        const accountIntegration = await this.client.post({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${type}`,
            data: payload
        });
        return accountIntegration as AlHeraldIntegration;
    }

    /**
     * Delete an integration for one account
     * DELETE
     * /herald/v1/:account_id/integrations/:id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE"
     *
     * @param accountId AIMS Account ID
     * @param integrationId Corresponding integration identifier.
     * @returns just the status code
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-DeleteAccountIntegrations
     */
    async deleteIntegration(accountId: string, integrationId: string) {
        const accountIntegrationDelete = await this.client.delete({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${integrationId}`
        });
        return accountIntegrationDelete;
    }

    /**
     * Get one integration for one account
     * GET
     * /herald/v1/:account_id/integrations/:id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE"
     *
     * @param accountId AIMS Account ID
     * @param integrationId Corresponding integration identifier.
     * @returns a promise with the integrations
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-GetAccountIntegrations
     */
    async getIntegrationById(accountId: string, integrationId: string): Promise<AlHeraldIntegration> {
        const accountIntegration = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${integrationId}`
        });
        return accountIntegration as AlHeraldIntegration;
    }

    /**
     * Get the integrations for one account
     * GET
     * /herald/v1/:account_id/integrations
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations"
     *
     * @param accountId AIMS Account ID
     * @returns a promise with the integrations
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-ListAccountIntegrations
     */
    async getIntegrationsByAccount(accountId: string ): Promise<AlHeraldIntegration[]> {
        const accountIntegrations = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: '/integrations'
        });
        return accountIntegrations.integrations as AlHeraldIntegration[];
    }

    /**
     * Get the integration types
     * GET
     * /herald/v1/integration_types
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/integration_types"
     * @returns a promise with the integration types
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-GetIntegrationTypes
     */
    async getIntegrationTypes(): Promise<AlHeraldIntegrationTypes[]> {
        const integrationTypes = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: '/integration_types'
        });

        return integrationTypes.integration_types as AlHeraldIntegrationTypes[];
    }

    /**
     * Update integration for the specified account
     * PUT
     * /herald/v1/:account_id/integrations/:id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/integrations/E31302AE-C9B7-4A4B-BC83-85806383D3FE"
     *
     * @param accountId AIMS Account ID
     * @param integrationId Corresponding integration identifier.
     * @param payload
     * @returns a promise with the integration
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Integrations-UpdateAccountIntegration
     */
    async updateIntegration(accountId: string, integrationId: string, payload: AlHeraldIntegrationPayload) : Promise<AlHeraldIntegration> {
        const integrationUpdate = await this.client.put({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/integrations/${integrationId}`,
            data: payload
        });

        return integrationUpdate as AlHeraldIntegration;
    }

    /**** Notifications ***/
    /**
     * Get the notifications by id
     * GET
     * /herald/v1/notifications/:notifications_id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/notifications/12345678"
     *
     * @param notificationId Notification id
     * @returns a promise with the notifications
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetANotification
     */
    async getNotificationsById(notificationId: string ): Promise<AlHeraldNotification>{
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            path: `/notifications/${notificationId}`
        });
        return notification as AlHeraldNotification;
    }

    /**
     * Get the notifications by account id
     * GET
     * /herald/v1/notifications/:notifications_id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/notifications"
     *
     * @param accountId AIMS Account ID
     * @param queryParams
     * @return a promise with the notifications
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetANotificationByAccountId
     */
    async getNotificationsByAccountId(accountId: string, queryParams: AlHeraldNotificationQuery ): Promise<AlHeraldNotificationList> {
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: '/notifications',
            params: queryParams
        });
        return notification as AlHeraldNotificationList;
    }

    /**
     * Get the notifications by id and by account id
     * GET
     * /herald/v1/:account_id/notifications/id/:notification_id
     * "https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/notifications/id/3B8EAFAABCASDD"
     *
     * @param accountId AIMS Account ID
     * @param notificationId Notification id
     * @return a promise with the notifications
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetANotificationByAccountIdAndNotificationId
     */
    async getNotificationsByIdAndByAccountId(accountId: string, notificationId: string ): Promise<AlHeraldNotification> {
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/notifications/id/${notificationId}`
        });
        return notification as AlHeraldNotification;
    }

    /**
     * Get sent notifications by incidentId and accountId
     * GET
     * /herald/v1/:account_id/notifications/features/incidents/incidents/:long_incident_id
     * https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/notifications/features/incidents/incidents/e81183mmmebdccf2
     *
     * @param accountId AIMS Account ID
     * @param incidentId Long incident id
     * @returns a promise with the notifications sent
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetSentIncidentNotificationsByAccountIdAndFeature
     */
    async getSentNotificationsByIncidentId(accountId: string, incidentId: string ): Promise<AlHeraldNotificationIncident[]> {
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/notifications/features/incidents/incidents/${incidentId}`
        });
        return notification.notifications as AlHeraldNotificationIncident[];
    }

    /**
     * Get notifications by feature
     * GET
     * /herald/v1/:account_id/notifications/:feature
     * https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/notifications/incidents
     *
     * @param accountId AIMS Account ID
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents.
     * @param queryParams
     * @returns a promise with the notifications
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetANotificationByAccountIdAndFeature
     */
    async getNotificationsByFeature(accountId: string, feature: string, queryParams: AlHeraldNotificationQuery ): Promise<AlHeraldNotificationList> {
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/notifications/${feature}`,
            params: queryParams
        });

        return notification.notifications as AlHeraldNotificationList;
    }

    /**
     * Get notifications by feature
     * GET
     * /herald/v1/:account_id/notifications/:feature/:subkey
     * https://api.global-integration.product.dev.alertlogic.com/herald/v1/12345678/notifications/incidents/escalations/critical
     *
     * @param accountId AIMS Account ID
     * @param feature Feature name of the subscription key. examples: endpoints, search, incidents.
     * @param subkey
     * @param queryParams
     * @returns a promise with the notifications
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-GetANotificationByAccountIdAndFeatureAndSubkey
     */
    async getNotificationsByFeatureBySubscription(accountId: string, feature: string, subkey: string, queryParams: AlHeraldNotificationQuery ): Promise<AlHeraldNotificationList> {
        const notification = await this.client.get({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/notifications/${feature}/${subkey}`,
            params: queryParams
        });
        return notification.notifications as AlHeraldNotificationList;
    }

    /**
     * Create a notification
     * POST
     * /herald/v1/:account_id/notifications
     *
     * @param accountId AIMS Account ID
     * @param payload notification object
     * @returns a promise with a notification
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-SendANotification
     */
    async createNotification( accountId: string, payload: AlHeraldNotificationPayload): Promise<AlHeraldNotification> {
        const notification = await this.client.post({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: '/notifications',
            data: payload
        });
        return notification as AlHeraldNotification;
    }

    /**
     * Update notification by id
     * PUT
     * /herald/v1/:account_id/notifications/:notification_id
     *
     * @param accountId AIMS Account ID
     * @param notificationId Notification id
     * @param payload object with status
     *
     * @returns a promise with the notification updated
     *
     * @remarks
     * https://console.account.product.dev.alertlogic.com/users/api/herald/index.html#api-Notifications-UpdateANotification
     */
    async updateNotification(accountId: string, notificationId: string, payload: {status:string}) : Promise<AlHeraldNotification> {
        const notificationUpdate = await this.client.put({
            service_name: this.serviceName,
            version: this.serviceVersion,
            account_id: accountId,
            path: `/notifications/${notificationId}`,
            data: payload
        });

        return notificationUpdate as AlHeraldNotification;
    }
}
