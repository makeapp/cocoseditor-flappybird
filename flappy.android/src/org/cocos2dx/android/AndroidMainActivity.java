package org.cocos2dx.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import com.makeapp.game.flappy.R;
import org.cocos2dx.lib.Cocos2dMainActivity;
import org.cocos2dx.lib.Cocos2dxLocalStorage;

public class AndroidMainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.android_main);

        Button btn = (Button) findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(AndroidMainActivity.this, Cocos2dMainActivity.class));
            }
        });

        String languageType = getResources().getConfiguration().locale.getCountry();
        if (languageType.equals("CN")) {
            Cocos2dxLocalStorage.setItem("language", "CN");
            System.out.println("language china");
        } else {
            Cocos2dxLocalStorage.setItem("language", "US");
            System.out.println("language english");
        }
    }
}
