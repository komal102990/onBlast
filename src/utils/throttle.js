/* eslint-disable */
import timestampNow from 'performance-now';

/**
 *  Prevent multiple action over the
 *  defined time.
 */
export default function throttle(func, wait, ctx, immediate = true) {
    let timeoutRefId;
    let args;
    let context;
    let timestamp;
    let result;

    const later = () => {
        const last = timestampNow() - timestamp;

        if (last < wait && last >= 0) {
            timeoutRefId = setTimeout(later, wait - last);
        } else {
            timeoutRefId = null;

            if (!immediate) {
                result = func.apply(context, args);

                if (!timeoutRefId) {
                    const context = null;
                    const args = null;
                }
            }
        }
    };

    return () => {
        context = ctx || this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        timestamp = timestampNow();
        const callNow = immediate && !timeoutRefId;

        if (!timeoutRefId) timeoutRefId = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(context, args);
            const context = null;
            const args = null;
        }

        return result;
    };
}
