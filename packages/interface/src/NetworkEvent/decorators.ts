import {Metadata} from '../metadata/Metadata'

/**
 * Options for the `NetworkEvent` decorator.
 */
export interface NetworkEventOptions {
	/**
	 * The name of the network event this method listens to. If omitted, then
	 * the name of the method is used.
	 */
	name: NetworkEventTypes
}

export type NetworkEventTypes =
	| 'entityAppeared'
	| 'entityDisappeared'
	| 'entityUpdated'

const NetworkMetadataMap: Record<NetworkEventTypes, string> = {
	entityAppeared: Metadata.NetworkEvent.EntityAppeared,
	entityDisappeared: Metadata.NetworkEvent.EntityDisappeared,
	entityUpdated: Metadata.NetworkEvent.EntityUpdated,
}

/**
 * Marks a method as a network event listener. Possible event names are as follows:
 *   * entityAppeared,
 *   * entityDisappeared,
 *   * entityUpdated,
 *   * entityPublished.
 * @param options Additional options to customize the listener.
 */
export function NetworkEvent(options: Partial<NetworkEventOptions> = {}) {
	return function (target: any, propertyKey: any, _descriptor: PropertyDescriptor) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const networkEventType: NetworkEventTypes = options.name ?? propertyKey
		// The target will never be primitive, so this argument is actually safe.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		Reflect.defineMetadata(NetworkMetadataMap[networkEventType], propertyKey, target)
	}
}
