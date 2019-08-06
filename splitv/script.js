var Addon_Id = "SplitV";
var Default = "ToolBar1Right";

var item = GetAddonElement(Addon_Id);
if (window.Addon == 1) {
	Addons.SplitV =
	{
		Exec: function (nMax, nMode)
		{
			var TC = [te.Ctrl(CTRL_TC)];
			Addons.SplitV.Exec2(nMax, TC);
			switch (nMode) {
				case 1:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "100%";
					TC[0].Height = "100%";
					break;
				case 2:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "50%";
					TC[0].Height = "100%";
					TC[1].Left = "50%";
					TC[1].Top = 0;
					TC[1].Width = "50%";
					TC[1].Height = "100%";
					break;
				case 3:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "33.33%";
					TC[0].Height = "100%";
					TC[1].Left = "33.33%";
					TC[1].Top = 0;
					TC[1].Width = "33.33%";
					TC[1].Height = "100%";
					TC[2].Left = "66.66%";
					TC[2].Top = 0;
					TC[2].Width = "33.33%";
					TC[2].Height = "100%";
					break;
				case 4:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "25%";
					TC[0].Height = "100%";
					TC[1].Left = "25%";
					TC[1].Top = 0;
					TC[1].Width = "25%";
					TC[1].Height = "100%";
					TC[2].Left = "50%";
					TC[2].Top = 0;
					TC[2].Width = "25%";
					TC[2].Height = "100%";
					TC[3].Left = "75%";
					TC[3].Top = 0;
					TC[3].Width = "25%";
					TC[3].Height = "100%";
					break;
				case 5:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "20%";
					TC[0].Height = "100%";
					TC[1].Left = "20%";
					TC[1].Top = 0;
					TC[1].Width = "20%";
					TC[1].Height = "100%";
					TC[2].Left = "40%";
					TC[2].Top = 0;
					TC[2].Width = "20%";
					TC[2].Height = "100%";
					TC[3].Left = "60%";
					TC[3].Top = 0;
					TC[3].Width = "20%";
					TC[3].Height = "100%";
					TC[4].Left = "80%";
					TC[4].Top = 0;
					TC[4].Width = "20%";
					TC[4].Height = "100%";
					break;
				case 6:
					TC[0].Left = 0;
					TC[0].Top = 0;
					TC[0].Width = "16.66%";
					TC[0].Height = "100%";
					TC[1].Left = "16.66%";
					TC[1].Top = 0;
					TC[1].Width = "16.66%";
					TC[1].Height = "100%";
					TC[2].Left = "33.33%";
					TC[2].Top = 0;
					TC[2].Width = "16.66%";
					TC[2].Height = "100%";
					TC[3].Left = "50%";
					TC[3].Top = 0;
					TC[3].Width = "16.66%";
					TC[3].Height = "100%";
					TC[4].Left = "66.66%";
					TC[4].Top = 0;
					TC[4].Width = "16.66%";
					TC[4].Height = "100%";
					TC[5].Left = "83.33%";
					TC[5].Top = 0;
					TC[5].Width = "16.66%";
					TC[5].Height = "100%";
					break;
				}
			TC[0].Selected.Focus();
		},

		Exec2: function (nMax, TC)
		{
			var nTC = (TC[0] && TC[0].Count) ? 1 : 0;
			var Group = nTC ? TC[0].Data.Group : 0;
			var cTC = te.Ctrls(CTRL_TC);
			var freeTC = [];
			for (var i = cTC.length; i-- > 0;) {
				var TC1 = cTC[i];
				if (TC1.Data.Group == 0 || TC1.Data.Group == Group) {
					if (TC1.Count == 0) {
						TC1.Close();
					} else if (nTC && TC[0] == TC1) {
						TC1.Visible = true;
					} else if (nTC < nMax) {
						TC1.Visible = true;
						TC1.Data.Group = Group;
						TC[nTC++] = TC1;
					} else {
						TC1.Visible = false;
						TC1.Data.Group = 0;
						freeTC.push(TC1);
					}
				}
			}
			for (;nTC < nMax; nTC++) {
				var path = HOME_PATH;
				var type = CTRL_SB;
				var viewmode = FVM_DETAILS;
				var flags = FWF_SHOWSELALWAYS | FWF_NOWEBVIEW | FWF_AUTOARRANGE;
				var icon = 0;
				var options = EBO_SHOWFRAMES | EBO_ALWAYSNAVIGATE;
				var viewflags = 0;
				if (TC[0]) {
					var FV = TC[0].Selected;
					if (FV) {
						path = FV.FolderItem;
						type = FV.Type;
						viewmode = FV.CurrentViewMode;
						flags = FV.FolderFlags;
						icon = FV.IconSize;
						options = FV.Options;
						viewflags = FV.ViewFlags;
					}
				}
				TC[nTC] = Addons.SplitV.CreateTC(freeTC, 0, 0, 0, 0, te.Data.Tab_Style, te.Data.Tab_Align, te.Data.Tab_TabWidth, te.Data.Tab_TabHeight, Group);
				if (TC[nTC].Count == 0) {
					TC[nTC].Selected.Navigate2(path, SBSP_NEWBROWSER, type, viewmode, flags, options, viewflags, icon, te.Data.Tree_Align, te.Data.Tree_Width, te.Data.Tree_Style, te.Data.Tree_EnumFlags, te.Data.Tree_RootStyle, te.Data.Tree_Root);
					TC[nTC].Visible = true;
				}
			}
		},
	
		CreateTC: function (freeTC, Left, Top, Width, Height, Style, Align, TabWidth, TabHeight, Group)
		{
			if (freeTC.length) {
				TC = freeTC.shift();
				TC.Left = Left;
				TC.Top = Top;
				TC.Width = Width;
				TC.Height = Height;
				TC.Style = Style;
				TC.Align = Align;
				TC.TabWidth = TabWidth;
				TC.TabHeight = TabHeight;
				TC.Visible = true;
			} else {
				var TC = te.CreateCtrl(CTRL_TC, Left, Top, Width, Height, Style, Align, TabWidth, TabHeight);
			}
			TC.Data.Group = Group;
			return TC;
		},

		SetButtons: function (Addon_Id, Default, item, n, ar)
		{
			var s = [];
			for (var i = 0; i < ar.length; i++) {
				if (!item.getAttribute("No" + ar[i].id)) {
					s.push('<span class="button" onclick="Addons.SplitV', n, '.Exec(', ar[i].exec, ')" onmouseover="MouseOver(this)" onmouseout="MouseOut()"><img title="', ar[i].id, '" src="../addons/SplitV', n, '/', ar[i].img || ar[i].id, '.png" style="width: 12pt"></span>');
				}
			}
			document.getElementById(Addon_Id).innerHTML = s.join("");
		}
	};

	SetAddon(Addon_Id, Default, '<span id="' + Addon_Id + '"></span>');

	AddEvent("load", function ()
	{
		Addons.SplitV.SetButtons(Addon_Id, Default, item, "",
		[
			{ id: "1x1", exec: "1, 1", img: "1x1" },
			{ id: "2x1", exec: "2, 2", img: "2x1" },
			{ id: "3x1", exec: "3, 3", img: "3x1" },
			{ id: "4x1", exec: "4, 4", img: "4x1" },
			{ id: "5x1", exec: "5, 5", img: "5x1" },
			{ id: "6x1", exec: "6, 6", img: "6x1" }
		]);
	});
} else {
	var s = ['<label>View</label><br>'];
	var ar = ["1x1", "2x1", "3x1", "4x1", "5x1", "6x1"];
	for (var i = 0; i < ar.length; i++) {
		s.push('<label><input type="checkbox" id="!No', ar[i], '" />', ar[i], '</label>&nbsp;');
	}
	SetTabContents(0, "General", s);
}
