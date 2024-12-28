import { useIntl } from "umi";

const useLocale = (id) => {
    const intl = useIntl();
    const t = (id) => {
        const msg = intl.formatMessage({id});
        return msg
    }
    return t(id)
}

export default useLocale;