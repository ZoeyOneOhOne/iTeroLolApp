// retry.js
async function retryOperation(operation, maxRetries, initialDelay = 1000, maxDelay = 60000) {
    let retries = 0;
    let delay = initialDelay;
    
    while (retries < maxRetries) {
        try {
            await operation();
            return; // Operation succeeded, no need to retry
        } catch (error) {
            console.error(`Error during operation, retrying in ${delay}ms:`, error);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = Math.min(delay * 2, maxDelay);
            retries++;
        }
    }
    
    throw new Error(`Operation failed after ${retries} retries.`);
}

module.exports = {
    retryOperation
};
