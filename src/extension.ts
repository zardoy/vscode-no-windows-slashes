import vscode from 'vscode'
import 'vscode-framework'
import { getExtensionSetting } from 'vscode-framework'

export const activate = () => {
    // TODO add web check
    // TODO setting change
    if (process.env.PLATFORM === 'web' && !getExtensionSetting('web.enable')) return
    const web = getExtensionSetting('web.enable')
    vscode.window.onDidChangeWindowState(async ({ focused }) => {
        if (!focused) return
        console.time('get setting')
        console.log(getExtensionSetting('web.enable'))
        console.timeEnd('get setting')
        const clipboardText = await vscode.env.clipboard.readText()
        if (!clipboardText.includes('\\')) return
        const newPath = clipboardText.split('\\').join('/')
        await vscode.env.clipboard.writeText(newPath)
    })
}
