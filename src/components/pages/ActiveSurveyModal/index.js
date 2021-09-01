import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

import { selectors } from "store";

function ActiveSurveyModal({ survey, close, loading }) {
  const chartData = {
    labels: survey?.activeQuestionChoices,
    datasets: [
      {
        backgroundColor: "#b9aae4",
        data: survey?.activeQuestionChoices.map(
          (choice) => survey?.results?.filter((r) => r.q === choice).length
        ),
      },
    ],
  };
  const chartOptions = {
    legend: { display: false },
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: Math.max(survey?.results?.length, 1),
            precision: 0,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[0];
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = parseFloat(
            ((currentValue / survey?.results?.length) * 100).toFixed(2)
          );
          return `${currentValue} (${percentage}%)`;
        },
      },
    },
  };

  return (
    <Modal isOpen={!!survey} toggle={close}>
      <ModalHeader toggle={close}>{survey?.title}</ModalHeader>
      <ModalBody>
        {loading ? (
          <div className="flex_center_center">
            <CircularProgress />
          </div>
        ) : (
          survey && <HorizontalBar data={chartData} options={chartOptions} />
        )}
      </ModalBody>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  loading: selectors.surveys.getIsLoading(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSurveyModal);
