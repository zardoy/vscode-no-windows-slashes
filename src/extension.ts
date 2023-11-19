import * as vscode from 'vscode'
import { getExtensionSetting, registerExtensionCommand } from 'vscode-framework'

export const activate = () => {
    const normalizeClipboard = async () => {
        const windowPathRegex = /^"?[A-Z]:\\/
        if (!getExtensionSetting('enable')) return
        const clipboard = await vscode.env.clipboard.readText()
        if (!getExtensionSetting('alwaysPatch') && !windowPathRegex.test(clipboard)) return
        const patched = clipboard.replaceAll('\\', '/')
        await vscode.env.clipboard.writeText(patched)
    }

    registerExtensionCommand('fixedCopyFilePath', async () => {
        await vscode.commands.executeCommand('copyFilePath')
        await normalizeClipboard()
    })
    vscode.window.onDidChangeWindowState(({ focused }) => {
        if (focused) normalizeClipboard()
    })
}
