import MnistData from "../data";
const data = new MnistData();

async function train(model, onIteration) {

    const LEARNING_RATE = 0.15;

    const optimizer = 'rmsprop';

    model.compile({
        optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });

    const batchSize = 65;

    // Leave out the last 15% of the training data for validation, to monitor
    // overfitting during training.
    const validationSplit = 0.15;

    // Get number of training epochs from the UI.
    const trainEpochs = ui.getTrainEpochs();

    // We'll keep a buffer of loss and accuracy values over time.
    let trainBatchCount = 0;

    const trainData = data.getTrainData();
    const testData = data.getTestData();

    const totalNumBatches =
        Math.ceil(trainData.xs.shape[0] * (1 - validationSplit) / batchSize) *
        trainEpochs;

    // During the long-running fit() call for model training, we include
    // callbacks, so that we can plot the loss and accuracy values in the page
    // as the training progresses.
    let valAcc;
    await model.fit(trainData.xs, trainData.labels, {
        batchSize,
        validationSplit,
        epochs: trainEpochs,
        callbacks: {
            onBatchEnd: async (batch, logs) => {
                trainBatchCount++;
                ui.logStatus(
                    `Training... (` +
                    `${(trainBatchCount / totalNumBatches * 100).toFixed(1)}%` +
                    ` complete). To stop training, refresh or close page.`);
                ui.plotLoss(trainBatchCount, logs.loss, 'train');
                ui.plotAccuracy(trainBatchCount, logs.acc, 'train');
                if (onIteration && batch % 10 === 0) {
                    onIteration('onBatchEnd', batch, logs);
                }
                await tf.nextFrame();
            },
            onEpochEnd: async (epoch, logs) => {
                valAcc = logs.val_acc;
                ui.plotLoss(trainBatchCount, logs.val_loss, 'validation');
                ui.plotAccuracy(trainBatchCount, logs.val_acc, 'validation');
                if (onIteration) {
                    onIteration('onEpochEnd', epoch, logs);
                }
                await tf.nextFrame();
            }
        }
    });