Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;

public static class ShortcutHelper {
    public static void Create(string lnkPath, string target, string args,
        string workDir, string iconPath, string description) {
        IShellLinkW link = (IShellLinkW)new CShellLink();
        link.SetPath(target);
        if (!string.IsNullOrEmpty(args)) link.SetArguments(args);
        if (!string.IsNullOrEmpty(workDir)) link.SetWorkingDirectory(workDir);
        if (!string.IsNullOrEmpty(iconPath)) link.SetIconLocation(iconPath, 0);
        if (!string.IsNullOrEmpty(description)) link.SetDescription(description);
        link.SetShowCmd(7);

        IPersistFile file = (IPersistFile)link;
        file.Save(lnkPath, true);
    }

    [ComImport, Guid("00021401-0000-0000-C000-000000000046")]
    class CShellLink {}

    [ComImport, Guid("000214F9-0000-0000-C000-000000000046"),
     InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    interface IShellLinkW {
        void GetPath([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszFile, int cch, IntPtr pfd, uint fFlags);
        void GetIDList(out IntPtr ppidl);
        void SetIDList(IntPtr pidl);
        void GetDescription([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszName, int cch);
        void SetDescription([MarshalAs(UnmanagedType.LPWStr)] string pszName);
        void GetWorkingDirectory([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszDir, int cch);
        void SetWorkingDirectory([MarshalAs(UnmanagedType.LPWStr)] string pszDir);
        void GetArguments([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszArgs, int cch);
        void SetArguments([MarshalAs(UnmanagedType.LPWStr)] string pszArgs);
        void GetHotkey(out ushort pwHotkey);
        void SetHotkey(ushort wHotkey);
        void GetShowCmd(out int piShowCmd);
        void SetShowCmd(int iShowCmd);
        void GetIconLocation([Out, MarshalAs(UnmanagedType.LPWStr)] System.Text.StringBuilder pszIconPath, int cch, out int piIcon);
        void SetIconLocation([MarshalAs(UnmanagedType.LPWStr)] string pszIconPath, int iIcon);
        void SetRelativePath([MarshalAs(UnmanagedType.LPWStr)] string pszPathRel, uint dwReserved);
        void Resolve(IntPtr hwnd, uint fFlags);
        void SetPath([MarshalAs(UnmanagedType.LPWStr)] string pszFile);
    }
}
"@ -ReferencedAssemblies 'System.Runtime.InteropServices'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$lnkPath = Join-Path ([Environment]::GetFolderPath('StartMenu')) 'Programs\Icon Maker.lnk'
$batPath = Join-Path $scriptDir 'start-icon-maker.bat'
$icoPath = Join-Path $scriptDir 'app-icon.ico'

[ShortcutHelper]::Create(
    $lnkPath,
    "$env:SystemRoot\System32\cmd.exe",
    "/c `"$batPath`"",
    $scriptDir,
    $icoPath,
    "Icon Maker - Favicon、Windowsアイコン、SNSプロフィール画像を作成"
)

Write-Host 'Shortcut created: Icon Maker' -ForegroundColor Green
Write-Host "$lnkPath"
Write-Host ''
Write-Host 'スタートメニューで「Icon Maker」を検索し、右クリックから「スタートにピン留めする」を選択してください。'
