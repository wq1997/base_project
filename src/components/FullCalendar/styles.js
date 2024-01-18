


export const siderContentStyle = useEmotionCss(({ token }) => {
    return {
        width: '100%',
        height: '100%',
        overflow: auto,
        '-ms-overflow-style': none, /* 适用于Internet Explorer, Edge */
        scrollbarWidth: none,/* 适用于Firefox */
        overflowY: scroll,
        '  &::-webkit-scrollbar': {
            display: none, /* 适用于Chrome、Safari和Opera */
        },
        ' .fc ': {
            width: '100%',
            height: '100%',
            '--fc-border-color': rgba(145, 158, 171, 0.16),
            '--fc-now-indicator-color': '#ff5630',
            '--fc-today-bg-color': rgba(145, 158, 171, 0.08),
            '--fc-page-bg-color': '#ffffff',
            '--fc-neutral-bg-color': '#F4F6F8',
            '--fc-list-event-hover-bg-color': rgba(145, 158, 171, 0.08),
            '--fc-highlight-color': rgba(145, 158, 171, 0.08),
            a: {
                color: '#000',
            },
            '.fc-col-header': {
                boxShadow: 'rgba(145, 158, 171, 0.2) 0px -1px 0px inset',
                th:{
                  borderColor: transparent,
                },
                '.fc-col-header-cell-cushion': {
                  fontWeight: 600,
                  fontSize: '16px',
                  padding: '8px 0px',
                }
              }
        },

    }

})