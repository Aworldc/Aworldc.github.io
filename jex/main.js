import { exec } from './exec.js'
import { $, $css, _ } from './something.js'

$css(`
    h2 {
        margin: 0
    }

    * {
        font-family: sans-serif;
    }
`)

$('.app').insert(
    _()
        .style('display', 'flex')
        .style('height', 'calc(100vh - 16px)')
        .style('gap', '10px')
        .style('flex-direction', 'column')
        .insert(_('h2').text('Code'))
        .insert(
            _('textarea')
                .style('resize', 'none')
                .style('flex-grow', '1')
                .id('codeEditor')
        )
        .insert(_('h2').text('Logger'))
        .insert(
            _()
                .id('logs')
                .style('max-height', '23%')
                .style('overflow-y', 'scroll')
        )
        .insert(_('h2').text('Actions'))
        .insert(
            _()
                .style('display', 'flex')
                .style('gap', '8px')
                .insert(
                    _('button')
                        .text('Run')
                        .style('height', '30px')
                        .handle('click', exec)
                )
                .insert(
                    _('button')
                        .text('Clear ')
                        .style('height', '30px')
                        .handle('click', exec)
                )
        )
)
