/**
 * External dependencies
 */
import Gridicon from 'gridicons';
import React, { ChangeEvent, Fragment, FunctionComponent, useState } from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import GSuiteDomainsSelect from './domains-select';
import FormFieldset from 'components/forms/form-fieldset';
import FormTextInput from 'components/forms/form-text-input';
import FormTextInputWithAffixes from 'components/forms/form-text-input-with-affixes';
import FormInputValidation from 'components/forms/form-input-validation';
import { GSuiteNewUser as NewUser } from 'lib/gsuite/new-users';

interface Props {
	domains: any[];
	onUserRemove: () => void;
	onUserValueChange: ( field: string, value: string ) => void;
	user: NewUser;
}

const GSuiteNewUser: FunctionComponent< Props > = ( {
	domains,
	onUserRemove,
	onUserValueChange,
	user: {
		firstName: { value: firstName, error: firstNameError },
		lastName: { value: lastName, error: lastNameError },
		mailBox: { value: mailBox, error: mailBoxError },
		domain: { value: domain, error: domainError },
	},
} ) => {
	const translate = useTranslate();
	const contactText = translate( 'contact', {
		context: 'part of e-mail address',
		comment: 'As it would be part of an e-mail address contact@example.com',
	} );

	// use this to control setting the "touched" states below. That way the user will not see a bunch of
	// "This field is required" errors pop at once
	const wasValidated =
		[ firstName, lastName, mailBox ].some( value => '' !== value ) ||
		[ firstNameError, lastNameError, mailBoxError, domainError ].some( value => null !== value );

	const [ firstNameFieldTouched, setFirstNameFieldTouched ] = useState( false );
	const [ lastNameFieldTouched, setLastNameFieldTouched ] = useState( false );
	const [ mailBoxFieldTouched, setMailBoxFieldTouched ] = useState( false );

	const hasMailBoxError = mailBoxFieldTouched && null !== mailBoxError;
	const hasFirstNameError = firstNameFieldTouched && null !== firstNameError;
	const hasLastNameError = lastNameFieldTouched && null !== lastNameError;

	const renderSingleDomain = () => {
		return (
			<FormTextInputWithAffixes
				placeholder={ translate( 'e.g. %(example)s', { args: { example: contactText } } ) }
				value={ mailBox }
				isError={ hasMailBoxError }
				onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
					onUserValueChange( 'mailBox', event.target.value );
				} }
				onBlur={ () => {
					setMailBoxFieldTouched( wasValidated );
				} }
				suffix={ `@${ domain }` }
			/>
		);
	};

	const renderMultiDomain = () => {
		return (
			<Fragment>
				<FormTextInput
					placeholder={ translate( 'e.g. %(example)s', { args: { example: contactText } } ) }
					value={ mailBox }
					isError={ hasMailBoxError }
					onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
						onUserValueChange( 'mailBox', event.target.value );
					} }
					onBlur={ () => {
						setMailBoxFieldTouched( wasValidated );
					} }
				/>
				<GSuiteDomainsSelect
					domains={ domains }
					onChange={ event => {
						onUserValueChange( 'domain', event.target.value );
					} }
					value={ domain }
				/>
			</Fragment>
		);
	};

	return (
		<div>
			<FormFieldset className="gsuite-new-user-list__new-user-email-fieldset">
				<div className="gsuite-new-user-list__new-user-email">
					{ domains.length > 1 ? renderMultiDomain() : renderSingleDomain() }
				</div>
				{ hasMailBoxError && <FormInputValidation text={ mailBoxError } isError /> }
			</FormFieldset>

			<FormFieldset className="gsuite-new-user-list__new-user-name-fieldset">
				<div className="gsuite-new-user-list__new-user-name">
					<div className="gsuite-new-user-list__new-user-name-container">
						<FormTextInput
							placeholder={ translate( 'First Name' ) }
							value={ firstName }
							maxLength={ 60 }
							isError={ hasFirstNameError }
							onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
								onUserValueChange( 'firstName', event.target.value );
							} }
							onBlur={ () => {
								setFirstNameFieldTouched( wasValidated );
							} }
						/>
						{ hasFirstNameError && <FormInputValidation text={ firstNameError } isError /> }
					</div>
					<div className="gsuite-new-user-list__new-user-name-container">
						<FormTextInput
							placeholder={ translate( 'Last Name' ) }
							value={ lastName }
							maxLength={ 60 }
							isError={ hasLastNameError }
							onChange={ ( event: ChangeEvent< HTMLInputElement > ) => {
								onUserValueChange( 'lastName', event.target.value );
							} }
							onBlur={ () => {
								setLastNameFieldTouched( wasValidated );
							} }
						/>
						{ hasLastNameError && <FormInputValidation text={ lastNameError } isError /> }
					</div>
					<div>
						<Button
							className="gsuite-new-user-list__new-user-remove-user-button"
							onClick={ onUserRemove }
						>
							<Gridicon icon="trash" />
							<span>{ translate( 'Remove User' ) }</span>
						</Button>
					</div>
				</div>
			</FormFieldset>
		</div>
	);
};

export default GSuiteNewUser;
