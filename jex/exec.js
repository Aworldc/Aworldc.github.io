import { $, _, _list } from './something.js'

export function exec() {
    let logs = _list()

    $('#logs').clear()

    logs.subscribe(() => {
        let logdiv = $('#logs').clear().style('display', 'flex').style('flex-direction', 'column')

        logs.get().forEach((log) => {
            let bg, fg

            if (log.level == 'cowrepl:info') {
                bg = '#000'
                fg = '#fff'
            } else if (log.level == 'script:info') {
                bg = '#00f'
                fg = '#fff'
            } else if (log.level == 'script:warn') {
                bg = '#fd0'
                fg = '#000'
            } else if (log.level == 'script:error') {
                bg = '#f00'
                fg = '#fff'
            }

            logdiv
                .insert(
                    _('p')
                        .style('margin', '1px')
                        .style('display', 'flex')
                        .style('gap', '10px')
                        .insert(
                            _('span')
                                .style('background', bg)
                                .style('color', fg)
                                .text(`[${log.level}]`)
                        )
                        .insert(
                            _('span').text(log.content)
                        )
                )

        })
    })

    let log = (text) => {
        logs.push({
            level: 'cowrepl:info',
            content: text,
        })
    }

    log('Starting...')
    let code = $('#codeEditor')._domEl.value

    let win = window.open(
        'about:blank',
        'cowrepl_eval_enviroment',
        'popup,width=300,height=450,top=50,left=50'
    )

    window.childlogger = {
        log: (text) => {
            logs.push({
                level: 'script:info',
                content: text,
            })
        },
        warn: (text) => {
            logs.push({
                level: 'script:warn',
                content: text,
            })
        },
        error: (text) => {
            logs.push({
                level: 'script:error',
                content: text,
            })
        },
        scriptdone: () => {
            log('Cleaning up...')
        },
        closed: () => {
            log('Done')
        },
    }

    log('Running script...')
    win.document.body.appendChild(
        _()
            .insert(
                _('h1').text('Processing...').style('font-family', 'sans-serif')
            )
            .insert(
                _('script').text(
                    '/* CowRepl Evaluator v0.1.0 */' +
                        'console.log=window.opener.childlogger.log;' +
                        'console.warn=window.opener.childlogger.warn;' +
                        'console.error=window.opener.childlogger.error;' +
                        code.replaceAll('<br>', '\n') +
                        ';window.opener.childlogger.scriptdone();' +
                        'window.close();' +
                        'window.opener.childlogger.closed()'
                )
            )
            .toDom()
    )
}
