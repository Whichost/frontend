import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import classNames from 'classnames';
import { bool, func, shape, string } from 'prop-types';
import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { Button, FieldCheckboxGroup, Form } from '../../components';
import config from '../../config';
import { propTypes } from '../../util/types';
import css from './EditListingCapacityForm.css';

const CapacitySlider = withStyles({
    root: {
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid #EC5027',
      marginTop: -8,
      marginLeft: -12,
      '& .bar': {
        height: 9,
        width: 1,
        backgroundColor: '#EC5027',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {
      color: '#EC5027'
    },
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
      color: '#EC5027'
    },
    rail: {
      color: '#ccc',
      opacity: 1,
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

export const EditListingCapacityFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
				name,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = fieldRenderProps;


      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed" />
        </p>
      ) : null;
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <CapacitySlider
                aria-label="Capacity slider"
                defaultValue={[30, 50]}
            />

          <FieldCheckboxGroup
            className={css.capacity}
            id={name}
            name={name}
            options={config.custom.groupSize}
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingCapacityFormComponent.defaultProps = {
  selectedPlace: null,
  updateError: null,
};

EditListingCapacityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingCapacityFormComponent);
