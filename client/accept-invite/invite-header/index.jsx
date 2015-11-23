/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import CompactCard from 'components/card/compact';
import Site from 'my-sites/site';
import SitePlaceholder from 'my-sites/site/placeholder';
import Gravatar from 'components/gravatar';

export default React.createClass( {
	displayName: 'InviteHeader',

	getInviterName() {
		return get(
			this.props,
			'inviter.name',
			this.translate( 'User', { context: 'Placeholder text while loading an invitation.' } )
		);
	},

	getInvitedYouText() {
		let text = '';

		const inviterName = (
			<strong className="invite-header__inviter-name">
				{ this.getInviterName() }
			</strong>
		);

		switch ( get( this.props, 'invite.meta.role' ) ) {
			case 'administrator':
				text = this.translate(
					'{{inviterName/}} invited you to administer:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break;
			case 'editor':
				text = this.translate(
					'{{inviterName/}} invited you to edit:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break;
			case 'author':
				text = this.translate(
					'{{inviterName/}} invited you to author on:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break;
			case 'contributor':
				text = this.translate(
					'{{inviterName/}} invited you to contribute to:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break;
			case 'subscriber':
				text = this.translate(
					'{{inviterName/}} invited you to subscribe to:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break;
			case 'follower':
				text = this.translate(
					'{{inviterName/}} invited you to follow:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break
			default:
				text = this.translate(
					'{{inviterName/}} invited you to join:', {
						components: {
							inviterName: inviterName
						}
					}
				);
				break
		}

		return text;
	},

	render() {
		let classes = classNames( 'invite-header', { 'is-placeholder': ! this.props.invite } );
		return(
			<div className={ classes }>
				<CompactCard className="invite-header__inviter">
					<div className="invite-header__inviter-info">
						<Gravatar user={ this.props.inviter } size={ 32 } />
						<p className="invite-header__invited-you-text">
							{ this.getInvitedYouText() }
						</p>
					</div>
				</CompactCard>
				<CompactCard className="invite-header__site">
					{
						this.props.blog_details
						? <Site site={ this.props.blog_details } />
						: <SitePlaceholder />
					}
				</CompactCard>
			</div>
		);
	}
} );
