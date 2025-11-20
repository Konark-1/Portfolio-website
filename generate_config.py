import base64
import json

config = {
    "embedFeatures": {
        "modernEmbed": True,
        "hideAnglePanel": True,
        "hideFooter": True,
        "disableFilterPanel": True,
        "disableVisualPanel": True,
        "disableWebContextMenu": True,
        "disableAnalyzingPanel": True,
        "disableFocusMode": True,
        "disableSearchPanel": True,
        "disablePageNavigator": True,
        "disableSlicersPanel": True,
        "disableSelectionPanel": True,
        "disableBookmarksPanel": True,
        "disableSettingsPanel": True,
        "disableInsightsPanel": True
    }
}

print(base64.b64encode(json.dumps(config).encode('utf-8')).decode('utf-8'))
